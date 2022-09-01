import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';

import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  createTeacher(@Body() body) {
    console.log(body);
    return `Create Teacher`;
  }
  @Get()
  async getTeachers() {
    return this.teacherService.getTeachers();
  }

  @Get('/:teacherId')
  getTeacherById(@Param('teacherId') teacherId: string) {
    console.log(teacherId);
    return this.teacherService.getTeacherById(parseInt(teacherId));
  }

  @Put('/:teacherId')
  updateTeacherById() {
    return `Update Teacher By Id`;
  }

  @Put('/:teacherId/students/:studentsId')
  updateStudentByTeacher() {
    return `Update Student By Teacher`;
  }

  @Delete('/:teacherId')
  deleteTeacherById() {
    return `Delete Teacher using Id`;
  }

  @Get('/:teacherId/students')
  getStudentsByTeacherId() {
    return `Get Teacher by ID`;
  }

}
