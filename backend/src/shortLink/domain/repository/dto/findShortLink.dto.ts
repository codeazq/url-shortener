export class FindShortLinkOutputDto {
  id: bigint;
  url: string;
  alias: string;
  published: boolean;
  userId: bigint;
  createdAt: Date;
  updatedAt: Date;
}

export class HydrateShortLinksWithClicksCountInputDto {
  id: bigint;
  url: string;
  alias: string;
  published: boolean;
  userId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
