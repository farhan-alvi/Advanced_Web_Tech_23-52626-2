
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  private courses = [
    { id: 1, name: 'Web Technologies', credits: 3 },
    { id: 2, name: 'Database Systems', credits: 3 },
    { id: 3, name: 'Computer Networks', credits: 3 },
  ];

  getAllCourses() {
    return this.courses;
  }

  getCourseById(id: number) {
    return this.courses.find((course) => course.id === id) || null;
  }

  createCourse(course: { id: number; name: string; credits: number }) {
    this.courses.push(course);
    return course;
  }
}
