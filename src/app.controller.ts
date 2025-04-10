import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/aapp.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('addUser')
  addUser(@Body() user: any): string {
    return this.appService.addUser(user);
  }
  @Get('allUser')
  allUser() {
    return this.appService.allUser();
  }
  @Put('/putUser/:id')
  async updateUser(@Param('id',ParseIntPipe) id: string, @Body() user: User) {
    return await this.appService.updateUser(Number(id), user);
  }
  @Delete('/deleteUser/:id')
  deleteUser(@Param('id',ParseIntPipe) id:string){
    return this.appService.deleteUser(Number(id))
  }
}
