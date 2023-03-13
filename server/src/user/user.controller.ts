import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/schema/user.schema';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: User) {
    return await this.userService.create(body);
  }

  @Get(':uid')
  async findByUid(@Param('uid') uid: string){
    return await this.userService.findByUid(uid);
  }
}
