import { HttpStatus } from "@nestjs/common";
// import { from } from "rxjs";



export interface AppResponseType {

  success: boolean;

  message: string;

  data?: any;

  error?: any;

  statusCode: number

}



export const AppResponseSuccess = (

  message = 'Response',

  data = null,

  status = HttpStatus.OK,

): AppResponseType => {

  return {

    success: true,

    message,

    data,

    statusCode: status

  }

}



export const AppResponseError = (

  message = 'Response',

  data = null,

  status = HttpStatus.INTERNAL_SERVER_ERROR,

): AppResponseType => {

  return {

    success: false,

    message,

    error: data,

    statusCode: status

  }

}