import { Controller, Get, Param, NotFoundException, Res } from '@nestjs/common';
import { ShortLinkService } from '../../domain/shortLink.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('')
@ApiTags('redirect')
export class RedirectController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @Get(':alias')
  @ApiOkResponse()
  async findOne(@Param('alias') alias: string, @Res() response: Response) {
    const shortLink = await this.shortLinkService.findOneByAlias(alias);
    if (!shortLink) throw new NotFoundException(`short url not found`);
    response.redirect(shortLink.url);
  }
}
