import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Patch,
    UploadedFile,
    UseInterceptors,
    HttpException,
    HttpStatus,
    UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import * as path from 'path';
import { FILE_MIME_TYPE } from 'src/_config/config';

@Controller('files')
export class Filecontroller {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', null, {
    limits: {
      fileSize: 5*1024*1024
    },
    fileFilter: (req: any, file, callback) => {
      var allowedMimes = Object.values(FILE_MIME_TYPE);
      let fileType = ['.docx', '.doc', '.pdf', '.xlsx', '.xls', '.csv', '.jpg', '.jpeg', '.png', '.gif'];
      var ext = path.extname(file.originalname);
      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else if (fileType.includes(ext)) {
        callback(null, true);
      } else {
        return callback(new HttpException(`Invalid file type. Only ${fileType.join(',')} files are allowed.`, HttpStatus.BAD_REQUEST), false)
      }
    },
  }))
  async uploadFile(@UploadedFiles() files) {
    console.log(files);
    return this.fileService.uploadfile(files)
  }
}

