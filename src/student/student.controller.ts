import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import {
  CreateStudentDto,
  UpdateStudentDto,
  MultipleIdDeletionDto,
} from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Get('/')
  async findAllStudent() {
    // console.log(this.studentService.findAll());
    return this.studentService.findAll();
  }

  @Get('download')
  async downloadPdf() {
    // console.log(this.studentService.findAll());
    return this.studentService.generatePdf();
  }

  @Get('/:id')
  async findStudent(@Param('id') id: string) {
    return this.studentService.findOne(parseInt(id));
  }

  @Post('/student_entry')
  async createStudent(@Body() body: CreateStudentDto) {
    return this.studentService.create(body.email, body.name, body.teacherId);
  }

  @Delete('delete')
  async removeStudents(@Body() body: MultipleIdDeletionDto) {
    console.log(body);
    return this.studentService.removeManyIds(body)
  }

  @Patch('/:id')
  async updateStudent(@Param('id') id: string, @Body() body: UpdateStudentDto) {
    return this.studentService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async removeStudent(@Param('id') id: string) {
    return this.studentService.remove(parseInt(id));
  }

  // @Post('document')
  // async getDocument() {
  //   return this.studentService.generateDocument();
  // }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', {dest: "./stdUpload",}))
  // async uploadFile(@UploadedFile() file, @Body() body: UploadFileDto) {
  //   console.log(file, body.filename, body.createdAt);

  // }
}
// export class StudentController {
//   constructor(private readonly studentService: StudentService) {}
//   @Get()
//   getStudents(): FindStudentResponseDto[] {
//     return this.studentService.getStudents();
//   }

//   @Get('/:studentId')
//   getStudentById(
//     @Param('studentId', new ParseUUIDPipe()) studentId: string,
//   ): FindStudentResponseDto {
//     return this.studentService.getStudentById(studentId);
//   }

//   @Post()
//   createStudent(@Body() body: CreateStudentDto): StudentResponseDto {
//     return this.studentService.createStudent(body);
//   }

//   @Put('/:studentId')
//   updateStudentById(
//     @Param('studentId') studentId: string,
//     @Body() body: UpdateStudentDto,
//   ): StudentResponseDto {
//     return this.studentService.updateStudent(body, studentId);
//   }

//   @Delete('/:studentId')
//   deleteStudentById(@Param('studentId') studentId: string) {
//     return `Delete Student By Id ${studentId}`;
//   }
// }
