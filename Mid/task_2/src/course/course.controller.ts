
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  UseFilters,
  BadRequestException,
  Catch,
  type ArgumentsHost,
  type ExceptionFilter,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import type { Express, Request, Response } from 'express';
import { extname } from 'path';
import { CourseService } from './course.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Catch(MulterError)
class FileUploadExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(400).json({
      message:
        exception.code === 'LIMIT_FILE_SIZE'
          ? 'File too large'
          : exception.message,
      error: 'Bad Request',
      statusCode: 400,
    });
  }
}

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Post()
  createCourse(@Body() dto: CreateCourseDto) {
    return this.courseService.createCourse(dto);
  }

  @Put(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(id, dto);
  }

  @Patch(':id')
  patchCourse(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.courseService.patchCourse(id, dto);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }

  @Post(':id/upload')
  @UseFilters(FileUploadExceptionFilter)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads',
        filename: (
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1_000_000,
          )}${extname(file.originalname).toLowerCase()}`;

          callback(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
      fileFilter: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
        const extension = extname(file.originalname).toLowerCase();

        if (!allowedExtensions.includes(extension)) {
          callback(
            new BadRequestException(
              'Only .jpg, .jpeg, .png, and .pdf files are allowed',
            ),
            false,
          );
          return;
        }

        callback(null, true);
      },
    }),
  )
  uploadCourseMaterial(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    if (!file) {
      throw new BadRequestException(
        'A file is required. Use the field name "file".',
      );
    }

    return this.courseService.uploadCourseMaterial(id, file);
  }
}
