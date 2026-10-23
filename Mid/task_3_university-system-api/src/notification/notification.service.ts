
import {
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service.js';

@Injectable()
export class NotificationService {
  private readonly enrollmentService: EnrollmentService;

  constructor(
    @Inject(forwardRef(() => EnrollmentService))
    enrollmentService: any,
  ) {
    this.enrollmentService = enrollmentService;
  }

  sendNotification(studentName: string, courseName: string) {
    return {
      message: `Notification sent to ${studentName} for ${courseName}`,
      sent: true,
    };
  }

  checkEnrollment(enrollmentId: number) {
    const enrollments = this.enrollmentService.getAllEnrollments();

    const enrollment = enrollments.find(
      (item) => item.id === enrollmentId,
    );

    if (!enrollment) {
      return { message: 'Enrollment not found' };
    }

    return {
      message: 'Enrollment found',
      enrollment,
    };
  }
}
