import { Injectable, Inject } from '@nestjs/common/decorators';
import ShortLinkRepository, {
  ShortLinkRepositoryName,
} from './repository/shortLink.repository';
import { AnalyticsService } from 'src/analytics/domain/analytics.service';
import { StatusCodes } from 'http-status-codes';
import { ShortLinkException } from 'src/utilities/ShortLinkException';

@Injectable()
export class RedirectService {
  constructor(
    @Inject(ShortLinkRepositoryName)
    private shortLinkRepository: ShortLinkRepository,
    private analyticsService: AnalyticsService,
  ) {}

  async getRedirect(
    alias: string,
    ip: string,
    userAgent: string,
  ): Promise<{ url: string }> {
    try {
      const shortLink = await this.shortLinkRepository.findByAlias(alias);

      if (!shortLink) {
        throw new ShortLinkException(
          'The shortLink not found',
          StatusCodes.NOT_FOUND,
        );
      }

      this.analyticsService.logClick(shortLink.id, ip, userAgent);

      return { url: shortLink.url };
    } catch (error) {
      throw error;
    }
  }
}
