import { Injectable } from '@nestjs/common';
import JWTService from '../domain/repository/jwtService';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export default class NestJWTService implements JWTService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  async sign(payload: string | object, jwtSecret?: string): Promise<string> {
    try {
      if (!jwtSecret) {
        return await this.nestJwtService.signAsync(payload);
      } else {
        return await this.nestJwtService.signAsync(payload, {
          secret: jwtSecret,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async verify(
    token: string,
    jwtSecret?: string,
  ): Promise<{ iss: string; sub: string; exp: string }> {
    try {
      if (!jwtSecret) {
        return await this.nestJwtService.verifyAsync(token);
      } else {
        return await this.nestJwtService.verifyAsync(token, {
          secret: jwtSecret,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
