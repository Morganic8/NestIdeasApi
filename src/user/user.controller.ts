import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserRO } from './user.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('api/users')
  showAllUsers(): Promise<UserRO[]> {
    return this.userService.showAll();
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() data: UserDTO): Promise<UserRO> {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() data: UserDTO): Promise<UserRO> {
    return this.userService.register(data);
  }
}
