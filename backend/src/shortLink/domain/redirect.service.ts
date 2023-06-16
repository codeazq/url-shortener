import { FindShortLinkOutputDto } from 'src/shortLink/domain/dto/findShortLink.dto';
import { Injectable, Inject } from '@nestjs/common/decorators';
import ShortLinkRepository, {
  ShortLinkRepositoryName,
} from './repository/shortLink.repository';
import { AnalyticsService } from 'src/analytics/domain/analytics.service';

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
  ): Promise<FindShortLinkOutputDto> {
    try {
      const shortLink = await this.shortLinkRepository.findByAlias(alias);

      this.analyticsService.logClick(shortLink.id, ip, userAgent);

      return shortLink;
    } catch (error) {
      throw error;
    }
  }
}
