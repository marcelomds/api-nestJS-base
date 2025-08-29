import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync as bcryptHasSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      id: String(user.id),
      username: user.email,
      password: user.password,
    }));
  }

  async create(newUser: UserDto) {
    const userAlreadyRegistered = await this.findByUserName(newUser.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(`User ${newUser.username} already exists`);
    }

    const userToCreate = new UserEntity();
    userToCreate.email = newUser.username;
    userToCreate.password = bcryptHasSync(newUser.password, 10);

    const { id, email } = await this.userRepository.save(userToCreate);

    return {
      id,
      username: email,
    };
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { email: username },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: String(userFound.id),
      username: userFound.email,
      password: userFound.password,
    };
  }
}
