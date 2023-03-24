import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UserModule } from '../user/user.module';
import { PlayerModule } from '../player/player.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    JwtModule.register({}),
    forwardRef(() => UserModule),
    PlayerModule,
    InventoryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
