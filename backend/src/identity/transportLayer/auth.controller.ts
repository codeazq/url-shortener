import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  UseGuards,
} from '@nestjs/common';
import { IdentityService } from '../domain/identity.service';
import { LoginOutputDto } from '../domain/dto/login.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UpdateUserResponseDto } from './dto/updateUser.request';
import { JwtAuthGuard } from '../utils/jwtAuth.guard';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginOutputDto })
  async login(@Body() loginDto: { token: string }): Promise<LoginOutputDto> {
    return await this.identityService.login(loginDto.token);
  }

  @Get('verify_email/:emailToken')
  @ApiOkResponse({ type: UpdateUserResponseDto })
  verifyEmail(
    @Request() req,
    @Param('emailToken') emailToken: string,
  ): Promise<UpdateUserResponseDto> {
    return this.identityService.verifyEmailToken(emailToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify_email')
  @ApiOkResponse({ type: String })
  sendEmailVerification(@Request() req): Promise<string> {
    const userId = req.user.userId;
    return this.identityService.sendEmailVerificationMail(userId);
  }
}
