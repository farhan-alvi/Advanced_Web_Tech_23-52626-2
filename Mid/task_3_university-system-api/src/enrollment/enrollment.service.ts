
import {
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CourseService } from '../course/course.service.js';
import { NotificationService } from '../notification/notification.service.js';

@Injectable()
export class EnrollmentService {
  private readonly notificationService: NotificationService;

  constructor(
    private readonly courseService: CourseService,
    @Inject(forwardRef(() => NotificationService))
    notificationService: any,
  ) {
    this.notificationService = notificationService;
  }

  private enrollments = [
    { id: 1, studentName: 'Rahim', courseId: 1 },
    { id: 2, studentName: 'Karim', courseId: 2 },
  ];

  getAllEnrollments() {
    return this.enrollments.map((enrollment) => ({
      ...enrollment,
      course: this.courseService.getCourseById(enrollment.courseId),
    }));
  }

  createEnrollment(enrollment: {
    id: number;
    studentName: string;
    courseId: number;
  }) {
    const course = this.courseService.getCourseById(enrollment.courseId);

    if (!course) {
      return { message: 'Course not found' };
    }

    this.enrollments.push(enrollment);

    const notification = this.notificationService.sendNotification(
      enrollment.studentName,
      course.name,
    );

    return {
      message: 'Enrollment created successfully',
      studentName: enrollment.studentName,
      course,
      notification,
    };
  }
}
