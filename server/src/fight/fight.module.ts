import { Module } from '@nestjs/common';
import { DropModule } from '../drop/drop.module';
import { MonsterModule } from '../monster/monster.module';
import { PlayerModule } from '../player/player.module';
import { UserModule } from '../user/user.module';
import { FightController } from './fight.controller';
import { FightService } from './fight.service';

@Module({
  imports: [PlayerModule, MonsterModule, UserModule, DropModule],
  controllers: [FightController],
  providers: [FightService],
  exports: [FightService],
})
export class FightModule {}
