import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { PlayerService } from 'src/player/player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/player/types/player.entity';
import { PlayerModule } from 'src/player/player.module';
import { LogModule } from 'src/log/log.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PlayerModule, LogModule, UserModule],
  providers: [ActionService],
  controllers: [ActionController]
})
export class ActionModule {}
