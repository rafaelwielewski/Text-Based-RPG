import { Body, Controller, Post, Get } from '@nestjs/common';
import { FightDto } from './dto/fightDto';
import { FightStartDto } from './dto/fightStartDto';
import { FightService } from './fight.service';

@Controller('fight')
export class FightController {
  constructor(private readonly fightService: FightService) {}

  @Post('fightstart')
  async fightStart(@Body() fightStartDto: FightStartDto) {
    return await this.fightService.fightStart(fightStartDto);
  }
  @Post('attack')
  async attack(@Body() fightDto: FightDto) {
    return await this.fightService.attack(fightDto);
  }

  @Get('test')
  async test() {
    return await this.fightService.test();
  }
}
