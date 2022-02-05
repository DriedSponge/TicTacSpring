import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(user: Prisma.UserCreateArgs): Promise<User>{
       return this.prisma.user.create(user);
    }
}
