
import { IsEmail, IsNotEmpty, Max, MaxLength, Min, MinLength, NotContains } from 'class-validator';

export class CreateUserDto {
  @IsEmail({},{message: "A valid email is required to sign up."})
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @NotContains(" ")
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  name: string;
}
