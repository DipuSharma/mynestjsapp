import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { AppResponseType, AppResponseSuccess, AppResponseError } from 'src/_config/appResponse';
import async from 'async';

@Injectable()
export class TeacherService {
  constructor(@InjectRepository(Teacher) private repo: Repository<Teacher>) {}

  // create(email: string, t_name: string, subject: string) {
  //   const teacher = this.repo.create({ email, t_name, subject });
  //   return this.repo.save(teacher);
  // }

  public async create (email: string, t_name: string, subject: string): Promise<AppResponseType> {
    return new Promise((res, rej) => {
      async.waterfall([
        cb => {
          const teacher = this.repo.create({email, t_name, subject})
          this.repo.save(teacher).then(data => {
            return cb(AppResponseSuccess('New Teacher Created', data))
          }).catch(err => {
            return cb(AppResponseError('New Teacher Not Created', err))
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

  // findOne(id: number) {
  //   if (!id) {
  //     return null;
  //   }
  //   return this.repo.findOne(id);
  // }
  public async getTeacherById(id: number): Promise<AppResponseType> {
    return new Promise((res, rej) => {
      async.waterfall([
        cb => {
          this.repo.findOne(id).then(data => {
            return cb(AppResponseSuccess('Single Teacher', data))
          }).catch(err => {
            return cb(AppResponseError('Error', err))
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
  getTeachers() {}

  update() {}

  remove() {}
}
