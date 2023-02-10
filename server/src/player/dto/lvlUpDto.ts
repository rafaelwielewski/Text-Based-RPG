import { IsString, } from 'class-validator';
             
export class LvlUpDto {

  @IsString()
  id: string;

  @IsString()
  skill: string;

  @IsString()
  lvl: number;


}
