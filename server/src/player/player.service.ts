import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationDto } from 'src/location/dto/locationDto';
import { LocationService } from 'src/location/location.service';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/createPlayerDto';
import { MovePlayerDto } from './dto/movePlayerDto';
import { Player } from './types/player.entity';

@Injectable()
export class PlayerService {
    constructor(@InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private locationService: LocationService,
  ) {}

  async create(createdPlayerDto: CreatePlayerDto): Promise<Player> {
    //console.log(createPlayerDto);
    const { id } = createdPlayerDto

    const createdPlayer = new Player();
    createdPlayer.id = id;
    createdPlayer.location = "Lumbridge"
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

  async move(movePlayerDto: MovePlayerDto): Promise<Player> {

    const { id, location } = movePlayerDto

    const movePlayer = new Player();
    movePlayer.id = id;
    movePlayer.location = location
    return this.playerRepository.save(movePlayer);

  }
  

  async findById(id: string) {
    //console.log(id)
    return this.playerRepository.findOne({where: {
        id: id,
    },});
  }

}
