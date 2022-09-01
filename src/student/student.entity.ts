import { IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  teacherId: number;

}

@Entity()
export class Countrydialcode {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  dialCode: string;

  @Column({unique: true})
  isoCode: string;

  @Column()
  flag: string

}
