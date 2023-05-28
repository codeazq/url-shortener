import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdentityService } from '../domain/identity.service';

import {
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from './dto/updateUser.request';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Patch()
  update(
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return this.identityService.update(updateUserRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.identityService.remove(+id);
  }
}
