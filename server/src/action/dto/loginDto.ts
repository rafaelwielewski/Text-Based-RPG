import { IsNumber } from 'class-validator';
             
export class LoginDto {

  @IsNumber()
  id: string;

}
