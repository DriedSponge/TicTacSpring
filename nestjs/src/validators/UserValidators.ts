import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "src/user/user.service";

@ValidatorConstraint({ name: "EmailInUse", async: true })
@Injectable()
export class EmailInUse implements ValidatorConstraintInterface {
    constructor(private userService: UserService) { }
    async validate(email: string) {
        try {
            await this.userService.getUserByEmail(email)
            return false;
        } catch (err) {
            return true;
        }
    }
    defaultMessage(args: ValidationArguments) {
        return `This email is already in use.`;
    }
}
@ValidatorConstraint({ name: "UserNameInUse", async: true })
@Injectable()
export class UserNameInUse implements ValidatorConstraintInterface {
    constructor(private userService: UserService) { }
    async validate(name: string) {
        try {
            await this.userService.getUserByUsername(name)
            return false;
        } catch (err) {
            return true;
        }

    }
    defaultMessage(args: ValidationArguments) {
        return `This username is already taken.`;
    }
}