import { Module } from '@nestjs/common';
import { IdentityController } from './transportLayer/identity.controller';
import { IdentityService } from './domain/identity.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepositoryName } from './domain/repository/user.repository';
import PrismaUserRepository from './infrastructure/datasources/prismaUser.repository';
import { GoogleAuthServiceName } from './domain/repository/googleAuthService';
import GoogleAuthServiceImpl from './infrastructure/externals/googleAuthServiceImpl';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';
import { JwtStrategy } from './utils/jwt.strategy';
import { JWTServiceName } from './domain/repository/jwtService';
import NestJWTService from './infrastructure/nestJwtService';

@Module({
  imports: [
    PrismaService,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [IdentityController],
  providers: [
    IdentityService,
    JwtStrategy,
    {
      provide: UserRepositoryName,
      useClass: PrismaUserRepository,
    },
    {
      provide: GoogleAuthServiceName,
      useClass: GoogleAuthServiceImpl,
    },
    {
      provide: JWTServiceName,
      useClass: NestJWTService,
    },
  ],
})
export class IdentityModule {}
