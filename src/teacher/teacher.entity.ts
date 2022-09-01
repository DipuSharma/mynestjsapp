import { IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  AfterInsert,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  t_name: string;

  @Column()
  subject: string;

  @AfterInsert()
  logInser() {
    console.log(`Inserted User with id`, this.id);
    return 'User creation successfully';
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id `, this.id);
    return 'User Update successfully';
  }

  @AfterRemove()
  logRemove() {
    console.log(`Remove User with id`, this.id);
    return 'User remove successfully';
  }
}
