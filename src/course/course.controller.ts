import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service.js';

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

}