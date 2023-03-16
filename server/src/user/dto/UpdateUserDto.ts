import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  refreshToken: string;
}
