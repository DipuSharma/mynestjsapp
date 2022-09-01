import { Controller, Get, Post, Put, Param } from '@nestjs/common';
// import { StudentService } from '../student/student.service';



// export class StudentTeacherController {
//   constructor(private readonly studentService: StudentService) {}
//   @Get()
//   getStudents(@Param('teacherId') teacherId: string): FindStudentResponseDto[] {
//     console.log(teacherId);
//     return this.studentService.getStudentsByTeacher(teacherId);
//   }

//   @Post()
//   createTeacher() {
//     return `Create Student By that teacher`;
//   }

//   @Put('/:studentsId')
//   updateStudentByTeacher(
//     @Param('teacherId') teacherId: string,
//     @Param('studentsId') studentsId: string,
//   ): StudentResponseDto {
//     console.log(teacherId, studentsId);
//     return this.studentService.updateStudentTeacher(teacherId, studentsId);
//   }

  // @Delete('/:studentId')
  // deleteTeacherById(
  //   @Param('teacherId') teacherId: string,
  //   @Param('studentId') studentId: string,
  // ): StudentResponseDto {
  //   return this.studentService.de;
  // }
// }
