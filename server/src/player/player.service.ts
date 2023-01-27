import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/createPlayerDto';
import { Player } from './types/player.entity';

@Injectable()
export class PlayerService {
    constructor(@InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { id } = createPlayerDto;
    
    const createdPlayer = new Player();
    createdPlayer.id = id;
    createdPlayer.hitpointsxp = 1;
    createdPlayer.attackxp = 1;
    createdPlayer.strenghtxp = 1;
    createdPlayer.defensexp = 1;
    createdPlayer.hitpoints = 10;
    createdPlayer.attack = 1;
    createdPlayer.strenght = 1;
    createdPlayer.defense = 1;
    createdPlayer.weapon = "none"
    createdPlayer.armour = "none"

    return this.playerRepository.save(createdPlayer);
  }

  async findById(id: number) {
    return this.playerRepository.findOne({where: {
        id: id,
    },});
  }

}
