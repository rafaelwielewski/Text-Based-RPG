import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { PlayerService } from '../player/player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../player/types/player.entity';
import { PlayerModule } from '../player/player.module';
import { LogModule } from '../log/log.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PlayerModule, LogModule, UserModule],
  providers: [ActionService],
  controllers: [ActionController],
})
export class ActionModule {}
