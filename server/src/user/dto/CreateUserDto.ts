import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  refreshToken: string;
}
