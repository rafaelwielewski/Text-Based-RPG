import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from 'src/location/location.module';
import { MonsterModule } from 'src/monster/monster.module';
import { UserModule } from 'src/user/user.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Player } from './types/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    LocationModule,
    MonsterModule,
    UserModule
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
