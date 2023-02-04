import { IsString, } from 'class-validator';
             
export class MovePlayerDto {
  
  @IsString()
  id: string;

  @IsString()
  location: string;

}