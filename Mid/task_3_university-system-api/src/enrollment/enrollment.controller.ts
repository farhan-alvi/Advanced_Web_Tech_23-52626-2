
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service.js';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  getAllEnrollments() {
    return this.enrollmentService.getAllEnrollments();
  }

  @Post()
  createEnrollment(
    @Body()
    enrollment: {
      id: number;
      studentName: string;
      courseId: number;
    },
  ) {
    return this.enrollmentService.createEnrollment(enrollment);
  }
}
