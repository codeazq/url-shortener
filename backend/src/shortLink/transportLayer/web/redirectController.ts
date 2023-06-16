import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Res,
  Req,
} from '@nestjs/common';
import { RedirectService } from './../../domain/redirect.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
@Controller('')
@ApiTags('redirect')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get(':alias')
  @ApiOkResponse()
  async findOne(
    @Param('alias') alias: string,
    @Req() req: Request,
    @Res() response: Response,
  ) {
    const ip = req.ip;
    const shortLink = await this.redirectService.getRedirect(
      alias,
      ip,
      req.headers['user-agent'],
    );

    if (!shortLink) throw new NotFoundException(`short url not found`);
    response.redirect(shortLink.url);

    // const ip = req.headers['X-Forwarded-For'];

    // let locationData = await this.ipLocationService.getLocation('102.219.52.1');

    // const useragentData = useragent.lookup(userAgentString);

    // http://ip-api.com/json/24.48.0.1

    // response.send(ip.address());
    // console.log(`ip;s ${ip}`);
    // if (!shortLink) throw new NotFoundException(`short url not found`);
    // response.redirect(shortLink.url);
  }
}
