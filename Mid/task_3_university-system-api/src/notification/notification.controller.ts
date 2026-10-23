
import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service.js';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Post('send')
  sendNotification(
    @Body()
    body: {
      studentName: string;
      courseName: string;
    },
  ) {
    return this.notificationService.sendNotification(
      body.studentName,
      body.courseName,
    );
  }

  @Post('check')
  checkEnrollment(
    @Body()
    body: {
      enrollmentId: number;
    },
  ) {
    return this.notificationService.checkEnrollment(
      body.enrollmentId,
    );
  }
}
