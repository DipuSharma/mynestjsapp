import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }
  async find(email: string) {
    return this.repo.find({ email });
  }
  async findAll(): Promise<User[]> {
    return this.repo.find();
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return this.repo.remove(user);
  }
}
