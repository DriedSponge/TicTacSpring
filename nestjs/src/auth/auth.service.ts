import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
        private jwtService: JwtService
        ) { }

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.usersService.getUserByEmail(email);

            if (user && bcrypt.compare(password, user.password)) {
                const { password, ...result } = user;
                return result;
            }
        } catch {
            return null;
        }
    }
    async login(user: any) {
        const payload = { id: user.id};
        return this.jwtService.sign(payload);
    }
}

