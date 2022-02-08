import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(user: Prisma.UserCreateArgs): Promise<User>{
       return this.prisma.user.create(user);
    }

    async getUserByUsername(name:string): Promise<any>{
        try {
            let user = await this.prisma.user.findFirst({
                rejectOnNotFound: true,
                where:{name:name}
            })
            return user
        }catch{
            return null
        }
    }

    async getUserByEmail(email:string): Promise<any>{
        try {
            let user = await this.prisma.user.findFirst({
                rejectOnNotFound: true,
                where:{email:email},
            })
            return user
        }catch{
            return null
        }
    }
}
