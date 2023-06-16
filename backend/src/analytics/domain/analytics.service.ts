import URLClickRepository, {
  URLClickRepositoryName,
} from './repository/urlClick.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateURLClickInputDto } from './dto/createURLClickDto';
import { FindURLClickOutputDto } from './dto/findURLClickDto';
import { GetNoOfClicksByShortLinkIdOutputDto } from './dto/getNoOfClicksByShortLinkIdDto';
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

      await this.create({
        shortLinkId,
        ...geoLocationDetails,
        ...useragentData,
      });

      return;
    } catch (error) {}
  }

  private async create(createURLClickInputDto: CreateURLClickInputDto) {
    try {
      await this.urlClickRepository.create(createURLClickInputDto);
    } catch (error) {}
  }

  async getNoOfClicksByShortLinkIds(
    ids: bigint[],
  ): Promise<GetNoOfClicksByShortLinkIdOutputDto[]> {
    try {
      return await this.urlClickRepository.findNoOfClicksByShortLinkIds(ids);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all analytics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analytics`;
  }
}
