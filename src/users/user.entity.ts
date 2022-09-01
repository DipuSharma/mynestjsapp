import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
