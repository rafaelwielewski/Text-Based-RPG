import { IsString } from 'class-validator';

export class EquipDto {
  @IsString()
  playerId: string;

  @IsString()
  equipmentName: string;
}
