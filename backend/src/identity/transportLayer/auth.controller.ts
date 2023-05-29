import { Controller, Post, Body } from '@nestjs/common';
import { IdentityService } from '../domain/identity.service';
import { LoginOutputDto } from '../domain/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('login')
  async login(@Body() loginDto: { token: string }): Promise<LoginOutputDto> {
    return await this.identityService.login(loginDto.token);
  }
}
