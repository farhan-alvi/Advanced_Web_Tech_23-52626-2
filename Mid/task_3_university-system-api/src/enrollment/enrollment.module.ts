import { Module } from '@nestjs/common';
import { CourseModule } from '../course/course.module.js';
import { EnrollmentController } from './enrollment.controller.js';
import { EnrollmentService } from './enrollment.service.js';

@Module({
  imports: [CourseModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
