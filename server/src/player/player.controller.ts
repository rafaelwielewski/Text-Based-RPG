import { Body, Param, Controller, Post, Get } from '@nestjs/common';
import { LocationService } from 'src/location/location.service';
import { CreatePlayerDto } from './dto/createPlayerDto';
import { MovePlayerDto } from './dto/movePlayerDto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService,
        private readonly locationService: LocationService,
        ) {}

    @Post('create')
    async create(
    @Body() createPlayerDto: CreatePlayerDto) {
    return await this.playerService.create(createPlayerDto);
    }

    @Post('move')
    async move(
    @Body() movePlayerDto: MovePlayerDto) {
    await this.playerService.move(movePlayerDto);
    return await this.locationService.findByName(movePlayerDto.location);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
    return await this.playerService.findById(id);
    }
}
