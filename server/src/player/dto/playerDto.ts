import { IsString, IsNumber } from 'class-validator';

export class PlayerDto {
  @IsString()
  id: string;

  @IsString()
  location: string;

  @IsString()
  training: string;

  @IsNumber()
  combatLvl: number;

  @IsNumber()
  hitpointsLvl: number;

  @IsNumber()
  attackLvl: number;

  @IsNumber()
  strenghtLvl: number;

  @IsNumber()
  defenceLvl: number;

  @IsNumber()
  hitpointsXP: number;

  @IsNumber()
  attackXP: number;

  @IsNumber()
  strenghtXP: number;

  @IsNumber()
  defenceXP: number;

  @IsNumber()
  hitpointsMax: number;

  @IsNumber()
  hitpoints: number;

  @IsNumber()
  attackBonus: number;

  @IsNumber()
  strenghtBonus: number;

  @IsNumber()
  defenceBonus: number;

  @IsString()
  weapon: string;

  @IsString()
  chest: string;

  @IsString()
  legs: string;

  @IsString()
  head: string;

  @IsString()
  shield: string;

  @IsString()
  hands: string;

  @IsString()
  feet: string;

  @IsString()
  neck: string;

  @IsString()
  ring: string;
}
