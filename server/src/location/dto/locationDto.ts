import { IsString } from 'class-validator';

export class LocationDto {
  @IsString()
  name: string;
}
