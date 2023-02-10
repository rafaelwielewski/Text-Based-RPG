import { Body, Param, Controller, Post, Get } from '@nestjs/common';

import { MonsterService } from './monster.service';

@Controller('monster')
export class MonsterController {
    constructor(private readonly monsterService: MonsterService,
        ) {}

    // @Post('attack')
    // async create(
    // @Body() attackMonsterDto: AttackMonsterDto) {
    // return await this.monsterService.attack(attackMonsterDto);
    // }

    @Get(':monsterName')
    async findById(@Param('monsterName') monsterName: string) {
    return await this.monsterService.findByName(monsterName);
    }
}

