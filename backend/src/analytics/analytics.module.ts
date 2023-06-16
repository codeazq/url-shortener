import { Module } from '@nestjs/common';
import { AnalyticsService } from './domain/analytics.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import PrismaURLClickRepository from './infrastructure/datasources/prismaURLClick.repositoty';
import { URLClickRepositoryName } from './domain/repository/urlClick.repository';
import { IpGeoLocationServiceName } from './domain/repository/ipGeoLocationService';
import IpApiIpGeoLocationService from './infrastructure/externals/IpApiIpGeoLocationService';
import { UserAgentParserServiceName } from './domain/repository/userAgentParserService';
import userAgentParserServiceImpl from './infrastructure/externals/userAgentParserServiceImpl';

@Module({
  imports: [PrismaModule],
  providers: [
    AnalyticsService,
    {
      provide: URLClickRepositoryName,
      useClass: PrismaURLClickRepository,
    },
    {
      provide: IpGeoLocationServiceName,
      useClass: IpApiIpGeoLocationService,
    },
    {
      provide: UserAgentParserServiceName,
      useClass: userAgentParserServiceImpl,
    },
  ],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
