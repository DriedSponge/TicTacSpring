
import { IsEmail, IsNotEmpty, Max, MaxLength, Min, MinLength, NotContains, Validate, Validator } from 'class-validator';
import { EmailInUse, UserNameInUse } from 'src/validators/UserValidators';

export class CreateGuestUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  uid: string;
  guest_account: boolean;
}
