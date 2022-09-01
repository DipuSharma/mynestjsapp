import * as path from "path"

require('dotenv').config()
console.log(process.env)

// const port = process.env.PORT

export const FILE_MIME_TYPE = {

    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  
    DOC: 'application/msword',
  
    PDF: 'application/pdf',
  
    XLS: 'application/vnd.ms-excel',
  
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  
    CSV: 'text/csv',
  
    JPEG: 'image/jpeg',
  
    JPG: 'image/jpeg',
  
    PNG: 'image/png',
  
    GIF: 'image/gif'
  
  }

  export const UPLOAD_DIR = {

    ROOT: path.join(__dirname,'uploads'),
  
    DESTINATION_DIR: 'uploads'
  
  }

  export const HOST_SERVER = {
    PORT: process.env.PORT,
  }