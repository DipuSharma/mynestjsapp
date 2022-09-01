import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CountryDialcodeController } from './country.controller';
import { CountryCodeService } from './countrycode.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countrydialcode, Student } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Countrydialcode])],
  controllers: [StudentController, CountryDialcodeController],
  providers: [StudentService, CountryCodeService],
  exports: [StudentService],
})
export class StudentModule {}
