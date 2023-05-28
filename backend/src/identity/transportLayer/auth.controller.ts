import { Controller, Post, Body } from '@nestjs/common';
import { IdentityService } from '../domain/identity.service';

@Controller('auth')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('login')
  login(@Body() loginDto: { token: string }) {
    return this.identityService.login(loginDto.token);
  }
}
