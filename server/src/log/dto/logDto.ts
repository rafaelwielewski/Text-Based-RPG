import { IsNumber, IsString } from 'class-validator';
             
export class logDto {

  @IsNumber()
  id: number;

  @IsString()
  text: string;

}
