import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../common/guards/acessTokenGuard';
import { Request } from 'express';
import { RefreshTokenGuard } from '../common/guards/refreshTokenGuard';
import { CreateUserDto } from '../user/dto/CreateUserDto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import RefreshTokenDto from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req['id']);
  }

  // @Get('refresh')
  // refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
  //   console.log
  //   const userId = refreshTokenDto['id'];
  //   const refreshToken = refreshTokenDto['refreshToken'];
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
