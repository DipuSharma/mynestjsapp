//  Data transfer Object
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateStudentDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @Column()
  contact: string

  @IsNumber()
  teacherId: number;
}

export class UpdateStudentDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  teacherId: number;
}

export class FindStudentResponseDto {
  // @IsNumber()
  id: number;

  // @IsEmail()
  email: string;

  // @IsString()
  name: string;

  // @IsNumber()
  teacherId: number;
}

export class StudentResponseDto {
  @IsNumber()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  teacherId: number;
}

export class MultipleIdDeletionDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Type(() => Number)
  ids: number[];
}

export class StoreDialCodeDto {
  @IsString()
  name: string

  @Column()
  dialCode: string

  @Column()
  isoCode: string

  @Column()
  flag: string
}

export class FindCountryDialCodeDto {
  // @IsArray()
  // @ArrayMinSize(1)
  // @ArrayMaxSize(10000)
  // @Type( () => String)
  @Column()
  dialCode: string;
}

// export class CreateStudentDto {
//   name: string;
//   teacher: string;
// }

// export class UpdateStudentDto {
//   name: string;
//   teacher: string;
// }
