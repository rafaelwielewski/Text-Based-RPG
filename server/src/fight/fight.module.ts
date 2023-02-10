import { Module } from '@nestjs/common';
import { MonsterModule } from 'src/monster/monster.module';
import { PlayerModule } from 'src/player/player.module';
import { UserModule } from 'src/user/user.module';
import { FightController } from './fight.controller';
import { FightService } from './fight.service';

@Module({
  imports: [PlayerModule, MonsterModule, UserModule],
  controllers: [FightController],
  providers: [FightService],
  exports: [FightService],
})
export class FightModule {}
