import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentModule } from '../equipment/equipment.module';
import { InventoryModule } from '../inventory/inventory.module';
import { ItemModule } from '../item/item.module';
import { LocationModule } from '../location/location.module';
import { MonsterModule } from '../monster/monster.module';
import { UserModule } from '../user/user.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Player } from './types/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    LocationModule,
    MonsterModule,
    UserModule,
    ItemModule,
    InventoryModule,
    EquipmentModule,
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
