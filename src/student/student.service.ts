import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student, Countrydialcode} from './student.entity';
import { MultipleIdDeletionDto, UpdateStudentDto} from './dto/student.dto';
import { AppResponseType, AppResponseSuccess, AppResponseError } from 'src/_config/appResponse';
import async from 'async';
import * as fs from "fs";
import { Document, HeadingLevel, ImageRun, Packer, Paragraph, Table, TableCell, TableRow, VerticalAlign, TextRun} from "docx"
import path from 'path';
import * as Host from 'src/_config/config'
import { V4 as uuid4} from 'uuid'
let ejs = require('ejs');


@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private repo: Repository<Student>) { }
  // create(email: string, name: string, teacherId: number) {
  //   const student = this.repo.create({ email, name, teacherId });
  //   return this.repo.save(student);
  // }
  

  public async create(email: string, name: string, teacherId: number): Promise<AppResponseType> {
    return new Promise((res, rej) => {
      async.waterfall([
        cb => {
          const data = this.repo.save({email, name, teacherId})
          if (data) {
            console.log('data upload');
            
            return cb(AppResponseSuccess('New Student Created', data))
          } else {
            return cb(AppResponseError('Not Created'))
          }
        }
      ], (err: AppResponseType, result: AppResponseType) => {
        if (err) {
          return res(err)
        } else {
          return res (result)
        }
      })
    })
  }

  
  // async findAll(): Promise<FindStudentResponseDto[]> {
  //   const data = await this.repo.find()
  //   console.log(data);
  //   return data;
  // }
  public async findAll(): Promise<AppResponseType> {
    return new Promise((resolve, reject) => {
      async.waterfall([
        cb => {
          this.repo.find().then(data => {
            return cb(AppResponseSuccess('allstudent', data.reverse()))
          }).catch(err => {
            return cb(AppResponseError('Not Found', err))
          })
        }
      ], (err: AppResponseType, result: AppResponseType) => {
        if (err) {
          return resolve(err)
        } else {
          return resolve(result)
        }
      })
    })
  }

  public async generatePdf(): Promise<AppResponseType> {
    return new Promise((resolve, reject) => {
      async.waterfall([
        (cb) => {
          this.repo.find().then(data => {
            return cb(null, data)
          }).catch(err => {
            return cb(AppResponseError('Not Found'))
          })
        },
        (data: any, cb) => {
          let filename = "./uploads/report_status/StatusReport" + uuid4()
          let url = './views/status.ejs'
          let d = [{"name": "Dipu", "subject": "Computer"}]
          let report = {
            "success": true,
            "message": 'Single Report Details',
            "data":{
                "id": 2,
                "name": 'Check new with date range',
                "description": 'Description....',
                'slug': 'check-new-with-date-range-2',
                'projectId': 7,
                'type': 'weekly',
                'startDate': '2021-04-18',
                'endDate': '2021-04-24',
                'guId': '7a9aa909-353f-48c2-bb48-a4a27fb577c7'
                },
            'statusCode': 200
          };
          
          ejs.renderFile(url, {students : data, teachers: d, repots: report}, (err, res) => {
            if (err) {
              return cb(null, AppResponseError("Not Found"))
          } else {
              let pdf = require('html-pdf')
              let options = {
                  "height": "11.25in",
                  "width": "8.5in",
                  "header": {
                      "height": "20mm",
                  },
                  "footer": {
                      "height": "20mm",
                  },
              };
              let file_data = filename + '.pdf'
              pdf.create(res, options).toFile(file_data, function (err, res) {
                  if (err) {
                    return cb(null, AppResponseError("Not Run"))
                  } else {
                    let fullurl = `${Host.HOST_SERVER.PORT}` + file_data.replace('./uploads/', '').replace('\\', '/')
                    return cb(null, AppResponseSuccess("File Created", fullurl))
                  }
              });
          }
          })
        }
      ], (err: AppResponseType, result: AppResponseType) => {
        if (err) {
          return resolve(err)
        } else {
          return resolve(result)
        }
      })
    })
  }


  public async findOne(id: number): Promise<AppResponseType> {
    return new Promise((res, rej) => {
      async.waterfall([
        cb => {
          this.repo.findOne(id).then(data => {
            return cb(AppResponseSuccess('Single Student', data))
          }).catch(err => {
            return cb(AppResponseError('Error', err))
          })
        }
      ], (err: AppResponseType, result: AppResponseType) => {
        if (err) {
          return res(err)
        } else {
          return res(err)
        }
      })
    })
  }

  // findOne(id: number) {
  //   if (!id) {
  //     return null;
  //   }
  //   const data = this.repo.findOne(id);
  //   return data;
  // }

  public async update(id: number, dto: UpdateStudentDto): Promise<AppResponseType> {
    return new Promise((res, rej) => {
      async.waterfall([
        cb => {
          console.log(dto, id);
          this.repo.update({id}, {email: dto.email, name: dto.name, teacherId: dto.teacherId}).then(data => {
            return cb(null)
          }).catch(err => {
            return cb(AppResponseError('error', err))
          })
        },
        cb => {
          this.repo.findOne(id).then(data => {
            return cb(AppResponseSuccess('Data Update Successfylly', data))
          }).catch(err => {
            return cb(AppResponseError('error', err))
          })
        }
      ], (err: AppResponseType, result: AppResponseType) => {
        if (err) {
          return res(err)
        } else {
          return res(result)
        }
      })
    })
  }
  // async update(id: number, attrs: Partial<Student>) {
  //   const student = await this.findOne(id);
  //   if (!student) {
  //     throw new NotFoundException("Student Not Found");
  //   }
  //   Object.assign(student, attrs);
  //   return this.repo.save(student)
  // }

  public async remove(id: number): Promise<AppResponseType> {
    return new Promise((res, rej) => {
      async.waterfall([
        cb => {
          this.repo.findOne(id).then(data => {
            this.repo.remove(data)
            return cb(AppResponseSuccess('Data Deleted Successfylly', id))
          }).catch(err => {
            return cb(AppResponseError('error', err))
          })
        }
      ], (err: AppResponseType, result: AppResponseType) => {
        if (err) {
          return res(err)
        } else {
          return res(result)
        }
      })
    })
  }

  public async removeManyIds(body: MultipleIdDeletionDto): Promise<AppResponseType> {
    return new Promise((res, req) => {
      async.waterfall([
        cb => {
          this.repo.delete({
            id: In(body.ids)
          }).then(data => {
            if (data.affected === 0) {
              return cb(AppResponseSuccess('Not Data Found'))
            } else {
              return cb(AppResponseSuccess('Data Delete Successfylly', data))
            }
          }).catch(err => {
            return cb(AppResponseError('error', err))
          })
        }
      ], (err: AppResponseType, result: AppResponseType) => {
        if (err) {
          return res(err)
        } else {
          return res(result)
        }
      })
    })
  }
  
  // Document Code 
  

  // public async generateDocument(): Promise<AppResponseType> {
  //   const table = new Table({
  //     rows: [
  //       new TableRow({
  //         children: [
  //           new TableCell({
  //             children: [
  //               new Paragraph({
  //                 children: [
  //                   new TextRun({
  //                     text: 'Hii Dipu Sharma'
  //                   })
  //                 ]
  //               })
  //             ]
  //           })
  //         ]
  //       })
  //     ]
  //   })
  //   return new Promise((res, rej) => {
  //     async.waterfall([
  //       cb => {
          
  //       }
  //     ])
  //   })
  // }

  // public async uploadFile(body: UploadFileDto): Promise<AppResponseType> {
  //   return new Promise((res, rej) => {
  //     async.waterfall([
  //       cb => {
  //         console.log(body); 
  //       }
  //     ])
  //   })
  // }


  // async remove(id: number) {
  //   const student = await this.findOne(id);
  //   if (!student) {
  //     throw new NotFoundException('Student Not Found');
  //   }
  //   this.repo.remove(student);
  //   return 'Delete successfully';
  // }
}

function uuid4() {
  throw new Error('Function not implemented.');
}
// @Injectable()
// export class StudentService {
//   private students = students;
//   getStudents(): FindStudentResponseDto[] {
//     return this.students;
//   }

//   getStudentById(studentId: string): FindStudentResponseDto {
//     return this.students.find((student) => {
//       return student.id === studentId;
//     });
//   }

//   createStudent(payload: CreateStudentDto): StudentResponseDto {
//     const newStudent = {
//       id: '',
//       ...payload,
//     };

//     this.students.push(newStudent);
//     return newStudent;
//   }

//   updateStudent(payload: UpdateStudentDto, studentId: string) {
//     let updateStudent: StudentResponseDto;
//     const updateStudentList = this.students.map((student) => {
//       if (student.id === studentId) {
//         updateStudent = {
//           id: studentId,
//           ...payload,
//         };
//       } else return student;
//     });

//     this.students = updateStudentList;
//     return updateStudent;
//   }

//   getStudentsByTeacher(teacherId: string): FindStudentResponseDto[] {
//     return this.students.filter((student) => {
//       return student.teacher === teacherId;
//     });
//   }

//   updateStudentTeacher(
//     teacherId: string,
//     studentId: string,
//   ): StudentResponseDto {
//     let updateStudent: StudentResponseDto;
//     const updateStudentList = this.students.map((student) => {
//       if (student.id === studentId) {
//         updateStudent = {
//           ...student,
//           teacher: teacherId,
//         };
//       } else return student;
//     });

//     this.students = updateStudentList;
//     return updateStudent;
//   }

  // deleteStudentTeacher(
  //   teacherId: string,
  //   studentId: string,
  // ): StudentResponseDto {
  //   let deleteStudent: StudentResponseDto;
  //   const updateStudentList = this.students.map((student) => {
  //     if (student.id === studentId) {
  //       deleteStudent = {
  //         ...student,
  //         teacher: teacherId,
  //       };
  //     } else return student;
  //   });

  //   this.students = updateStudentList;
  //   return deleteStudent;
  // }
// }
