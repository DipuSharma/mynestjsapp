import { Module } from '@nestjs/common';
import { Filecontroller } from './file.controller';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { nanoid } from 'nanoid';
import { UPLOAD_DIR } from 'src/_config/config';

@Module({
  imports: [TypeOrmModule.forFeature([File]), MulterModule.register({
    dest: UPLOAD_DIR.ROOT,
    preservePath: true,
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `${UPLOAD_DIR.DESTINATION_DIR}`)
      },
      filename: function (req, file, cb) {
        cb(null, nanoid() + '_' + Date.now() + path.extname(file.originalname))
      }
    })
  }),],
  controllers: [Filecontroller],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
