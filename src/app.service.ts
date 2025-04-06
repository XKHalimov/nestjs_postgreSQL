import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/aapp.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  addUser(userBody: any): any {
    const findUser = this.userRepo.create(userBody);
    return this.userRepo.save(findUser);
  }
  allUser(): any {
    return this.userRepo.find();
  }
  async updateUser(id: number, user: User): Promise<User> {
    const existingUser = await this.userRepo.findOneBy({ id });
    if (!existingUser) {
      throw new Error(`User with ID ${id} not found`);
    }
    const updateUser = Object.assign(existingUser, user);
    return this.userRepo.save(updateUser);
  }
}
