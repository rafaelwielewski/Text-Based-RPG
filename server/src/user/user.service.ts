import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>,
) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, refreshToken} = createUserDto;
    
    const createdUser = new User();
    createdUser.username = username;
    createdUser.email = email;
    createdUser.password = password;
    createdUser.refreshToken = refreshToken;

    return this.userRepository.save(createdUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string) {
    return this.userRepository.findOne({where: {
        id: id,
    },});
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({where: {
        username: username,
    },});
  }

  async update(id: string, updateUserDto: UpdateUserDto,): Promise<User> {
    
    const { refreshToken } = updateUserDto;
    
    const updatedUser = new User();
    updatedUser.refreshToken = refreshToken;
    updatedUser.id = id;

    return this.userRepository.save(updatedUser)

  }

  async remove(id: string) {
    return this.userRepository.delete(id);
  }
}
