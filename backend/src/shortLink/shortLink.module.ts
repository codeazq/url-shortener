import { Module } from '@nestjs/common';
import { ShortLinkService } from './domain/shortLink.service';
import { ShortLinkController } from './transportLayer/web/shortLink.controller';
import { ShortLinkRepositoryName } from './domain/repository/shortLink.repository';
import PrismaShortLinkRepository from './infrastructure/datasources/prismaShortLink.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedirectController } from './transportLayer/web/redirectController';

@Module({
  imports: [PrismaModule],
  controllers: [ShortLinkController, RedirectController],
  providers: [
    ShortLinkService,
    {
      provide: ShortLinkRepositoryName,
      useClass: PrismaShortLinkRepository,
    },
  ],
})
export class ShortLinkModule {}
