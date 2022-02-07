
import { IsEmail, IsNotEmpty, Max, MaxLength, Min, MinLength, NotContains, Validate, Validator } from 'class-validator';
import { EmailInUse, UserNameInUse } from 'src/validators/UserValidators';

export class CreateUserDto {
  @IsEmail({},{message: "A valid email is required to sign up."})
  @IsNotEmpty()
  @Validate(EmailInUse)
  email: string;

  @IsNotEmpty()
  @NotContains(" ")
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Validate(UserNameInUse)
  name: string;
}
