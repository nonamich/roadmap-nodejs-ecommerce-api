import { IsEmail, IsString } from 'class-validator';

export class UserEventDto {
  @IsString()
  id!: string;

  @IsEmail()
  email!: string;

  @IsString()
  name!: string;
}
