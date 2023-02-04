import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from 'src/location/location.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Player } from './types/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    LocationModule
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
