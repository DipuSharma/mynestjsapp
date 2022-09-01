import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository, getConnection, Any } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Countrydialcode } from './student.entity';
import { AppResponseType, AppResponseSuccess, AppResponseError } from 'src/_config/appResponse';
import { countrycodeList } from 'src/db';
import async from 'async';

@Injectable()

export class CountryCodeService {
    constructor(@InjectRepository(Countrydialcode) private repo: Repository<Countrydialcode>) { }


    public async storeCountryDailCode() {
        // let connection: Connection = null
        async.waterfall([
            (cb) => {
                console.log('8.1 => Insert Dial Code')
                // let dialcodeRepo = connection.getRepository(Countrydialcode)

                let toInsertDialcode = countrycodeList.map((x: any) => {
                    return {
                        name: x.name,
                        dialCode: x.dialCode,
                        isoCode: x.isoCode,
                        flag: x.flag,
                    }
                })
                // const data = getConnection().createQueryBuilder().select().from(Countrydialcode, 'countrydialcode').where('countrydialcod.name')
                // console.log(data);
            
                getConnection().createQueryBuilder()
                    .insert()
                    .into('countrydialcode')
                    .values(toInsertDialcode)
                    .execute().then(_ => {
                        return cb(null)
                    }).catch(e => {
                        return cb(e)
                })
            },
        ])
    }

    public async findAll(): Promise<AppResponseType> {
        return new Promise((resolve, reject) => {
            async.waterfall([
              cb => {
                this.repo.find().then(data => {
                  return cb(AppResponseSuccess('All Dialcode', data.reverse()))
                }).catch(err => {
                  return cb(AppResponseError('Not Found', err))
                })
              },
              
            ], (err: AppResponseType, result: AppResponseType) => {
              if (err) {
                return resolve(err)
              } else {
                return resolve(result)
                console.log(result);
                
              }
            })
                        
          })
    }

    public async findSingle(): Promise<AppResponseType> {
      return new Promise( (res, rej) => {
        async.waterfall([
          cb => {
            console.log('find one');
          }
        ])
      })
    }

}