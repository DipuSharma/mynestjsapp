// Teachers data transfer objects

import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsEmail()
  email: string;

  @IsString()
  t_name: string;

  @IsString()
  subject: string;
}

export class UpdateTeacherDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  t_name: string;

  @IsString()
  @IsOptional()
  subject: string;
}

