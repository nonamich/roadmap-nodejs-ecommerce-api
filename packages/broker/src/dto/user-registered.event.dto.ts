import { IsEmail, IsInt, IsString } from 'class-validator';

export class UserRegisteredEventDto {
  @IsInt()
  id!: string;

  @IsEmail()
  email!: string;

  @IsString()
  name!: string;
}
