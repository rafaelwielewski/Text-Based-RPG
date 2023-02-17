import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropService } from './drop.service';
import { DropController } from './drop.controller';
import { Drop } from './types/drop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drop])],
  providers: [DropService],
  controllers: [DropController],
  exports: [DropService],
})
export class DropModule {}
