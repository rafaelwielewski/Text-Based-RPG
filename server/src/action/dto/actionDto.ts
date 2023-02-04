import { IsNumber, IsString } from 'class-validator';
             
export class ActionDto {

  @IsNumber()
  id: string;

  @IsString()
  input: string;

}
