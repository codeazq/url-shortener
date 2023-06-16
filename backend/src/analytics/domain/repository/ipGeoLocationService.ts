export default interface IpGeoLocationService {
  getLocation(ipAddress: string): Promise<GetGeoLocationOutputDto>;
}

export interface GetGeoLocationOutputDto {
  countryName: string;
  countryCode: string;
  regionName: string;
  regionCode: string;
  city: string;
}

export const IpGeoLocationServiceName = 'IpGeoLocationService';
