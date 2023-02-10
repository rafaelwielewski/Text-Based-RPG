import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';

export class AttackMonsterDtoObjects {
  @IsString()
  playerId: string;
  @IsString()
  playerName: string;
  @IsNumber()
  playerLvl: number;
  @IsNumber()
  playerHp: number;
  @IsString()
  monsterName: string;
  @IsNumber()
  monsterLvl: number;
  @IsNumber()
  monsterHp: number;
}

export class AttackMonsterDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttackMonsterDtoObjects)
  fight: AttackMonsterDtoObjects;
}
