import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { MonsterDto } from 'src/monster/dto/monsterDto';
import { PlayerDto } from 'src/player/dto/playerDto';

export class FightDto {
  @ValidateNested({ each: true })
  @Type(() => MonsterDto)
  monster: MonsterDto;

  @IsString()
  username: string;

  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  player: PlayerDto;

  @IsNumber()
  playerHit: number;

  @IsNumber()
  monsterHit: number;
}
