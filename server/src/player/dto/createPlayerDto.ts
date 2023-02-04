import { IsString, } from 'class-validator';
             
export class CreatePlayerDto {

  @IsString()
  id: string;

}
