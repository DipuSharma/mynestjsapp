import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UploadFileDto {
    @IsString()
    filename: string
  
    @IsString()
    createdAt: string
  
    @IsString()
    @IsOptional()
    updatedAt: string
  
    @IsString()
    @IsOptional()
    deletedAt: string
  }
  
  export class UpdateUploadFileDto {
    @IsString()
    @IsOptional()
    filename: string
  
    @IsString()
    @IsOptional()
    createdAt: string
  
    @IsString()
    updatedAt: string
  
    @IsString()
    @IsOptional()
    deletedAt: string
  }