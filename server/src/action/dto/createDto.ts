import { IsNumber } from 'class-validator';
             
export class CreateDto {

  @IsNumber()
  id: string;

}
