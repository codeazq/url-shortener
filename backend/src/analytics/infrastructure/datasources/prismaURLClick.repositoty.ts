import { Injectable } from '@nestjs/common';
import {
  CreateURLClickOutputDto,
  CreateURLClickInputDto,
} from 'src/analytics/domain/dto/createURLClickDto';
import { FindURLClickOutputDto } from 'src/analytics/domain/dto/findURLClickDto';
import URLClickRepository, {
  UrlClicksCount,
} from 'src/analytics/domain/repository/urlClick.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export default class PrismaURLClickRepository implements URLClickRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createURLClickInputDto: CreateURLClickInputDto,
  ): Promise<CreateURLClickOutputDto> {
    try {
      const urlClick = this.prismaService.urlClicks.create({
        data: createURLClickInputDto,
      });
      return urlClick;
    } catch (error) {
      throw error;
    }
  }
  findByUrlId(id: bigint): Promise<FindURLClickOutputDto[]> {
    throw new Error('Method not implemented.');
  }

  async findNoOfClicksByShortLinkIds(ids: bigint[]): Promise<UrlClicksCount[]> {
    try {
      let urlClicks = await this.prismaService.urlClicks.groupBy({
        by: ['shortLinkId'],
        where: {
          shortLinkId: { in: ids },
        },
        _count: {
          shortLinkId: true,
        },
      });

      return urlClicks.map((item) => {
        return {
          shortLinkId: item.shortLinkId,
          count: item._count.shortLinkId,
        };
      });
    } catch (error) {
      throw error;
    }
  }
}
