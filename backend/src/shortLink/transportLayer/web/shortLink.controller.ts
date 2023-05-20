import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShortLinkService } from '../../domain/shortLink.service';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  CreateShortLinkRequestDto,
  CreateShortLinkResponseDto,
} from './dto/createShortLink.request';
import { FindShortLinkResponseDto } from './dto/getShortLink.request.dto';
import {
  UpdateShortLinkRequestDto,
  UpdateShortLinkResponseDto,
} from './dto/updateShortLink.request';
import { DeleteShortLinkResponseDto } from './dto/deleteShortLink.request';

@Controller('short-links')
@ApiTags('short-links')
export class ShortLinkController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateShortLinkResponseDto })
  create(
    @Body() createShortLinkRequestDto: CreateShortLinkRequestDto,
  ): Promise<CreateShortLinkResponseDto> {
    return this.shortLinkService.create(createShortLinkRequestDto);
  }

  @Get()
  @ApiOkResponse({ type: FindShortLinkResponseDto, isArray: true })
  findAll(): Promise<FindShortLinkResponseDto[]> {
    return this.shortLinkService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: FindShortLinkResponseDto })
  findOne(@Param('id') id: string): Promise<FindShortLinkResponseDto> {
    return this.shortLinkService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateShortLinkResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateShortLinkRequestDto: UpdateShortLinkRequestDto,
  ): Promise<UpdateShortLinkResponseDto> {
    return this.shortLinkService.update(+id, updateShortLinkRequestDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteShortLinkResponseDto })
  remove(@Param('id') id: string): Promise<DeleteShortLinkResponseDto> {
    return this.shortLinkService.remove(+id);
  }
}
