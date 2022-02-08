import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { EmailInUse, UserNameInUse } from './UserValidators';

@Module({
    providers: [UserService,EmailInUse, UserNameInUse, PrismaService],
    exports: [EmailInUse, UserNameInUse],
  })
export class ValidatorsModule {}
