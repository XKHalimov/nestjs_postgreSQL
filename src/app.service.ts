import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/aapp.entity';
import { error } from 'console';

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
  async updateUser(id: number, user: Partial<User>): Promise<any> {
    try {
      const findUser = await this.userRepo.findOneBy({ id });
      if (!findUser) {
        throw new Error('bunday idga ega user yoq');
      }
      await this.userRepo.update(id, user);
      return this.userRepo.findOneBy({ id });
    } catch (error) {
      return { error: `Bunday IDgamos user topilmadi` };
    }
  }
  deleteUser(id: number): string {
    const user = this.userRepo.delete(id);
    return 'Shu Idga tegishli user ochirildi';
  }
}
