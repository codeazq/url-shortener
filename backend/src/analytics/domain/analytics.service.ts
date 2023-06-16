import URLClickRepository, {
  URLClickRepositoryName,
} from './repository/urlClick.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateURLClickInputDto } from './dto/CreateURLClickDto';
import { FindURLClickOutputDto } from './dto/FindURLClickDto';
import IpGeoLocationService, {
  GetGeoLocationOutputDto,
  IpGeoLocationServiceName,
} from './repository/ipGeoLocationService';
import UserAgentParserService, {
  ParserOutputDto,
  UserAgentParserServiceName,
} from './repository/userAgentParserService';

@Injectable()
export class AnalyticsService {
  constructor(
    @Inject(URLClickRepositoryName)
    private urlClickRepository: URLClickRepository,
    @Inject(IpGeoLocationServiceName)
    private ipGeoLocationService: IpGeoLocationService,
    @Inject(UserAgentParserServiceName)
    private userAgentParserService: UserAgentParserService,
  ) {}

  async logClick(shortLinkId: bigint, ip: string, userAgent: string) {
    try {
      const geoLocationDetails: GetGeoLocationOutputDto =
        await this.ipGeoLocationService.getLocation(ip);

      const useragentData: ParserOutputDto =
        this.userAgentParserService.parser(userAgent);

      this.create({ shortLinkId, ...geoLocationDetails, ...useragentData });

      return;
    } catch (error) {}
  }

  private async create(createURLClickInputDto: CreateURLClickInputDto) {
    try {
      return 'This action adds a new analytics';
    } catch (error) {}
  }

  findAll() {
    return `This action returns all analytics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analytics`;
  }
}
