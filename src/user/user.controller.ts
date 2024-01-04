import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return await this.userService.login(email, password);
  }

  @Get('user')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/check')
  async checkUser(@Req() req: any) {
    const user = req.user;
    return await this.userService.checkUser(
      user.name,
      user.point,
      user.email,
      user.is_admin,
    );
  }
}
