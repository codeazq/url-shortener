import { Injectable } from '@nestjs/common';
import IpGeoLocationService, {
  GetGeoLocationOutputDto,
} from 'src/analytics/domain/repository/ipGeoLocationService';
import axios from 'axios';

@Injectable()
export default class IpApiIpGeoLocationService implements IpGeoLocationService {
  async getLocation(ipAddress: string): Promise<GetGeoLocationOutputDto> {
    const ipLocationCheckerUrl = `https://ipapi.co/${ipAddress}/json/`;
    const { data } = await axios.get(ipLocationCheckerUrl);

    return {
      countryName: data.country_name,
      countryCode: data.country_code,
      regionName: data.region,
      regionCode: data.region_code,
      city: data.city,
    };
  }
}
