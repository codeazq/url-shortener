import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IdentityService } from '../domain/identity.service';
import { JwtAuthGuard } from '../utils/jwtAuth.guard';
import {
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from './dto/updateUser.request';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return this.identityService.update(updateUserRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.identityService.remove(+id);
  }
}
