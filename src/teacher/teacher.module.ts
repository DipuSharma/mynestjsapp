import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/student/student.module'
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';

@Module({
  imports: [StudentModule, TypeOrmModule.forFeature([Teacher])],
  controllers: [],
  providers: [TeacherService],
})
export class TeacherModule {}
