import { Body, Param, Controller, Post, Get } from '@nestjs/common';
import { CreatePlayerDto } from './dto/createPlayerDto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post('create')
    async create(
    @Body() createPlayerDto: CreatePlayerDto) {
    return await this.playerService.create(createPlayerDto);
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
    return await this.playerService.findById(id);
    }
}
