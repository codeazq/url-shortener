import { Injectable } from '@nestjs/common';
import JWTService from '../domain/repository/jwtService';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export default class NestJWTService implements JWTService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  async sign(payload: string | object): Promise<string> {
    try {
      return await this.nestJwtService.signAsync(payload);
    } catch (error) {
      console.log(error);
    }
  }
}
