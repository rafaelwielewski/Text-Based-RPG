import { Body, Param, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../common/guards/acessTokenGuard';
import { LocationService } from '../location/location.service';
import { CreatePlayerDto } from './dto/createPlayerDto';
import { EquipDto } from './dto/equipDto';
import { FightStartDto } from './dto/fightStartDto';
import { MovePlayerDto } from './dto/movePlayerDto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly locationService: LocationService,
  ) {}

  @Post('create')
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return await this.playerService.create(createPlayerDto);
  }

  @Post('move')
  async move(@Body() movePlayerDto: MovePlayerDto) {
    await this.playerService.move(movePlayerDto);
    return await this.locationService.findByName(movePlayerDto.location);
  }
  @Post('equip')
  async equip(@Body() equipDto: EquipDto) {
    return await this.playerService.equip(equipDto);
  }
  // @Post('fightstart')
  // async fightStart(@Body() fightStartDto: FightStartDto) {
  //   return await this.playerService.fightStart(fightStartDto);
  // }

  @Post('xp')
  async fightStart(@Body() id: string, xp: number) {
    return await this.playerService.gainXp(id, xp);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.playerService.findById(id);
  }
  // @Get(':id')
  // async test(@Param('id') id: number) {
  //   return await this.playerService.getExperienceAtLevel(id);
  // }
}
