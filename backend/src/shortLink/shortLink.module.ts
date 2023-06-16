import { Module } from '@nestjs/common';
import { ShortLinkService } from './domain/shortLink.service';
import { ShortLinkController } from './transportLayer/web/shortLink.controller';
import { ShortLinkRepositoryName } from './domain/repository/shortLink.repository';
import PrismaShortLinkRepository from './infrastructure/datasources/prismaShortLink.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedirectController } from './transportLayer/web/redirectController';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { RedirectService } from './domain/redirect.service';

@Module({
  imports: [PrismaModule, AnalyticsModule],
  controllers: [ShortLinkController, RedirectController],
  providers: [
    ShortLinkService,
    RedirectService,
    {
      provide: ShortLinkRepositoryName,
      useClass: PrismaShortLinkRepository,
    },
  ],
})
export class ShortLinkModule {}
