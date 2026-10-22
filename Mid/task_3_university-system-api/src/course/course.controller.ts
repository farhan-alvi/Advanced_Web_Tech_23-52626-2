
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { CourseService } from './course.service.js';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  getCourseById(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.getCourseById(id);
  }

  @Post()
  createCourse(
    @Body() course: { id: number; name: string; credits: number },
  ) {
    return this.courseService.createCourse(course);
  }
}
