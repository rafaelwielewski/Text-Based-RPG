import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Log } from 'src/log/entity/log.entity';
import { LogService } from 'src/log/log.service';
import { CreatePlayerDto } from 'src/player/dto/createPlayerDto';
import { PlayerService } from 'src/player/player.service';
import { Player } from 'src/player/types/player.entity';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ActionDto } from './dto/actionDto';
import { CreateDto } from './dto/createDto';
import { LoginDto } from './dto/loginDto';
import { Action } from './types/action.entity';
import { messages } from './types/messages.entity';

@Injectable()
export class ActionService {
  constructor(
    //@InjectRepository(Action)
    //private playerRepository: Repository<Action>,
    private playerService: PlayerService,
    private logService: LogService,
    private userService: UserService,
  ) {}

  private isPlayerCreated: boolean = true;
  private isPlayerLogged: boolean = false;
  private user;
  private player: Player;
  private logs = [];
  private logsKey: number = NaN;

  async create(createDto: CreateDto) {
    const { id } = createDto;

    const createPlayerDto = new CreatePlayerDto();
    createPlayerDto.id = id;
    return this.playerService.create(createPlayerDto);
  }

  async login(loginDto: LoginDto) {
    const { id } = loginDto;

    return this.playerService.findById(id);
  }

  async action(actionDto: ActionDto) {
    const { id, input } = actionDto;

    const action = new Action();
    action.id = id;
    action.input = input;
    action.isPlayerLogged = false; //test
    action.isPlayerCreated = false; //test

    if (action.input === 'create') {
      if (action.isPlayerCreated === false) {
        const createPlayerDto = new CreatePlayerDto();
        createPlayerDto.id = action.id;
        return await this.playerService.create(createPlayerDto);
      }
      if (action.isPlayerCreated === true) {
        //setGameLog(log);
      }
    }
    if (action.input === 'login') {
      if (this.isPlayerCreated === false) {
        this.logs.push(
          this.logService.setLog({ id: 1, text: messages.welcome }),
        );
        this.logs.push(this.logService.setLog({ id: 2, text: 'idasdasdj' }));
        console.log(this.logService.getLog());
        return this.logs;
      }
      if (this.isPlayerCreated === true) {
        this.user = this.userService.findById(action.id);
        //this.logs.push(this.logService.setLog({id: 1, text: messages.welcome}))
        //this.logs.push(this.logService.setLog({id: 2, text: 'idasdasdj'}))

        return this.user;
      }
    }
    if (action.input === 'test') {
      console.log(this.user);
      return this.user;
    }

    //return this.playerRepository.save(createdPlayer);
  }
}
