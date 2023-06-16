export class CreateURLClickInputDto {
  shortLinkId: bigint;
  countryName: string;
  countryCode: string;
  regionName: string;
  regionCode: string;
  city: string;
  device: string;
  os: string;
  browser: string;
}

export class CreateURLClickOutputDto {
  id: bigint;
  shortLinkId: bigint;
  countryName: string;
  countryCode: string;
  regionName: string;
  regionCode: string;
  city: string;
  device: string;
  os: string;
  browser: string;
  createdAt: Date;
}
