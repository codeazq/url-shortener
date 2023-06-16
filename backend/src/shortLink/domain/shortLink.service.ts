import { Injectable, Inject } from '@nestjs/common';
import {
  CreateShortLinkInputDto,
  CreateShortLinkOutputDto,
} from './dto/createShortLink.dto';
import {
  FindShortLinkOutputDto,
  HydrateShortLinksWithClicksCountInputDto,
} from './dto/findShortLink.dto';
import {
  UpdateShortLinkInputDto,
  UpdateShortLinkOuptDto,
} from './dto/updateShortLink.dto';
import { DeleteShortLinkOutputDto } from './dto/deleteShortLink.dto';
import ShortLinkRepository, {
  ShortLinkRepositoryName,
} from './repository/shortLink.repository';
import { ShortLinkException } from 'src/utilities/ShortLinkException';
import { StatusCodes } from 'http-status-codes';
import { AnalyticsService } from 'src/analytics/domain/analytics.service';
@Injectable()
export class ShortLinkService {
  constructor(
    @Inject(ShortLinkRepositoryName)
    private shortLinkRepository: ShortLinkRepository,
    private analyticsService: AnalyticsService,
  ) {}

  async create(
    createShortLinkInputDto: CreateShortLinkInputDto,
  ): Promise<CreateShortLinkOutputDto> {
    try {
      return await this.shortLinkRepository.create(createShortLinkInputDto);
    } catch (error) {}
  }

  async findAll(userId: bigint): Promise<FindShortLinkOutputDto[]> {
    try {
      let shortLinks = await this.shortLinkRepository.findManyByUserId(userId);

      // hydrate with clicks
      return this.hydrateShortLinksWithClicksCount(shortLinks);
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    id: number,
    userId: bigint | number,
  ): Promise<FindShortLinkOutputDto> {
    try {
      let shortLink = await this.shortLinkRepository.find(id);
      if (shortLink.userId != userId)
        throw new ShortLinkException(
          'The shortLink was not created by this user',
          StatusCodes.FORBIDDEN,
        );

      return this.hydrateShortLinksWithClicksCount([shortLink])[0];
    } catch (error) {
      throw error;
    }
  }

  async findOneByAlias(alias: string): Promise<FindShortLinkOutputDto> {
    try {
      const shortLink = await this.shortLinkRepository.findByAlias(alias);
      return this.hydrateShortLinksWithClicksCount([shortLink])[0];
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateShortLinkInputDto: UpdateShortLinkInputDto,
    userId: bigint | number,
  ): Promise<UpdateShortLinkOuptDto> {
    try {
      const shortLink = await this.shortLinkRepository.find(id);

      if (shortLink.userId != userId)
        throw new ShortLinkException(
          'The shortLink was not created by this user',
          StatusCodes.FORBIDDEN,
        );

      return await this.shortLinkRepository.update(id, updateShortLinkInputDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(
    id: number,
    userId: bigint | number,
  ): Promise<DeleteShortLinkOutputDto> {
    try {
      const shortLink = await this.shortLinkRepository.find(id);
      if (shortLink.userId != userId)
        throw new ShortLinkException(
          'The shortLink was not created by this user',
          StatusCodes.FORBIDDEN,
        );
      return await this.shortLinkRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  private async hydrateShortLinksWithClicksCount(
    shortLinks: HydrateShortLinksWithClicksCountInputDto[],
  ): Promise<FindShortLinkOutputDto[]> {
    const ids = shortLinks.map((shortLink) => shortLink.id);
    const urlClicks = await this.analyticsService.getNoOfClicksByShortLinkIds(
      ids,
    );

    let foundClicks, foundClicksIndex;
    for (let i = 0; i < shortLinks.length; i++) {
      foundClicks = urlClicks.find((item, itemIndex) => {
        if ((item.shortLinkId = shortLinks[i].id)) {
          foundClicksIndex = itemIndex;
          return true;
        }

        return false;
      });
      if (foundClicks) {
        shortLinks[i]['count'] = foundClicks.count;
        urlClicks.splice(foundClicksIndex, 1);
      } else {
        shortLinks[i]['count'] = 0;
      }
    }

    return shortLinks as FindShortLinkOutputDto[];
  }
}
