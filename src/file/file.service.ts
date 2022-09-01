import { Injectable} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../file/file.entity';
import { AppResponseType, AppResponseSuccess, AppResponseError } from 'src/_config/appResponse';
import async from 'async';


@Injectable()
export class FileService {
    constructor(@InjectRepository(File) private repo: Repository<File>) { }

    public async uploadfile(files: any[]): Promise<AppResponseType> {
        return new Promise((res, rej) => {
          async.waterfall([
            (cb) => {
                let toInserts = []
                files.map(file => {
                  toInserts.push(this.repo.create({
                    filename: file.filename,
                    originalName: file.originalname,
                    filepath: file.path,
                    mime: file.mimetype
                  }))
                })
      
                this.repo.insert(toInserts).then(fileIns => {
                    console.log(fileIns);
                
                  this.repo.find({
                    where: {
                      id: In(fileIns.generatedMaps.map(x => x.id))
                    }
                  }).then(fNew => {
                    return cb(null, AppResponseSuccess('Files uploaded', fNew))
                  }).catch(e => {
                    return cb(null, AppResponseSuccess('Files uploaded', fileIns))
                  })
      
                }).catch(e => {
                    console.log(e);
                    
                  return cb(AppResponseError('Error while saving file'))
                })
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
}