import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() newUser: UserDto) {
    const user = this.usersService.create(newUser);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Usuário criado com sucesso!',
      data: user,
    };
  }
}
