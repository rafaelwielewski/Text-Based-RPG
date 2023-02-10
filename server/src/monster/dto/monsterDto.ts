import { IsString, IsNumber } from 'class-validator';

export class MonsterDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  combatLvl: number;

  @IsNumber()
  attackLvl: number;

  @IsNumber()
  strenghtLvl: number;

  @IsNumber()
  defenceLvl: number;

  @IsNumber()
  xp: number;

  @IsNumber()
  hitpoints: number;

  @IsNumber()
  attackBonus: number;

  @IsNumber()
  strenghtBonus: number;

  @IsNumber()
  defenceBonus: number;

  @IsString()
  dropTable: string;
}
