import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { ActionModule } from './action/action.module';
import { LogModule } from './log/log.module';
import { LocationModule } from './location/location.module';
import { MonsterModule } from './monster/monster.module';
import { FightController } from './fight/fight.controller';
import { FightService } from './fight/fight.service';
import { FightModule } from './fight/fight.module';
import { DropModule } from './drop/drop.module';
import { InventoryModule } from './inventory/inventory.module';
import { ItemModule } from './item/item.module';
import { FoodModule } from './food/food.module';
import { EquipmentModule } from './equipment/equipment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        // cache: {
        //   type: "redis",
        //   options: {
        //       host: "localhost",
        //       port: 6379
        //   }
        // }
      }),
    }),
    UserModule,
    AuthModule,
    PlayerModule,
    ActionModule,
    LogModule,
    LocationModule,
    MonsterModule,
    FightModule,
    DropModule,
    InventoryModule,
    ItemModule,
    FoodModule,
    EquipmentModule,
  ],
  controllers: [AppController, FightController],
  providers: [AppService, FightService],
})
export class AppModule {}
