import { IsNumber, } from 'class-validator';
             
export class CreatePlayerDto {

  @IsNumber()
  id: number;

}
