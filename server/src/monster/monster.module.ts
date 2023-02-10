import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';
import { Monster } from './types/monster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Monster]),
  ],
  controllers: [MonsterController],
  providers: [MonsterService],
  exports: [MonsterService],
})
export class MonsterModule {}
