import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
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
import { JwtAuthGuard } from './../../../identity/utils/jwtAuth.guard';

@Controller('short-links')
@ApiTags('short-links')
export class ShortLinkController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ type: CreateShortLinkResponseDto })
  create(
    @Request() req,
    @Body() createShortLinkRequestDto: CreateShortLinkRequestDto,
  ): Promise<CreateShortLinkResponseDto> {
    const userId = req.user.userId;
    return this.shortLinkService.create({
      ...createShortLinkRequestDto,
      userId: userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: FindShortLinkResponseDto, isArray: true })
  findAll(@Request() req): Promise<FindShortLinkResponseDto[]> {
    const userId = req.user.userId;
    return this.shortLinkService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: FindShortLinkResponseDto })
  findOne(
    @Request() req,
    @Param('id') id: string,
  ): Promise<FindShortLinkResponseDto> {
    const userId = req.user.userId;
    return this.shortLinkService.findOne(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ type: UpdateShortLinkResponseDto })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateShortLinkRequestDto: UpdateShortLinkRequestDto,
  ): Promise<UpdateShortLinkResponseDto> {
    const userId = req.user.userId;
    return this.shortLinkService.update(+id, updateShortLinkRequestDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ type: DeleteShortLinkResponseDto })
  remove(
    @Request() req,
    @Param('id') id: string,
  ): Promise<DeleteShortLinkResponseDto> {
    const userId = req.user.userId;
    return this.shortLinkService.remove(+id, userId);
  }
}
