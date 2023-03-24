import { Body, Controller, Post } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionDto } from './dto/actionDto';
import { CreateDto } from './dto/createDto';
import { LoginDto } from './dto/loginDto';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post()
  async action(@Body() actionDto: ActionDto) {
    return await this.actionService.action(actionDto);
  }

  @Post('create')
  async create(@Body() createDto: CreateDto) {
    return await this.actionService.create(createDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.actionService.login(loginDto);
  }
}
