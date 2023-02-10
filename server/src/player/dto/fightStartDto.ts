import { IsString, } from 'class-validator';
             
export class FightStartDto {

  @IsString()
  playerId: string;

  @IsString()
  monsterName: string;

}
