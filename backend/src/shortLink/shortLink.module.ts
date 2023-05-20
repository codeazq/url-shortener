import { Module } from '@nestjs/common';
import { ShortLinkService } from './domain/shortLink.service';
import { ShortLinkController } from './transportLayer/web/shortLink.controller';
import { ShortLinkRepositoryName } from './domain/repository/shortLink.repository';
import PrismaShortLinkRepository from './infrastructure/datasources/prismaShortLink.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShortLinkController],
  providers: [
    ShortLinkService,
    {
      provide: ShortLinkRepositoryName,
      useClass: PrismaShortLinkRepository,
    },
  ],
})
export class ShortLinkModule {}
