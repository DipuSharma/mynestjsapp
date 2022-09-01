import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countrydialcode, Student } from 'src/student/student.entity';
import { StudentModule } from 'src/student/student.module';
import { Teacher } from 'src/teacher/teacher.entity';
import { TeacherModule } from 'src/teacher/teacher.module';
import { User } from 'src/users/user.entity';
import { UserModule } from 'src/users/user.module';
import { File } from 'src/file/file.entity';
import { FileModule } from 'src/file/file.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Student, Teacher, File, Countrydialcode],
      synchronize: true,
    }),
    TeacherModule,
    StudentModule,
    UserModule,
    FileModule,
  ],
})
export class AppModule {}
