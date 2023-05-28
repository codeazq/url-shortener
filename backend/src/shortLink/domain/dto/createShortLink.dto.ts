export class CreateShortLinkInputDto {
  url: string;
  alias: string;
  published?: boolean;
  userId: bigint | number;
}

export class CreateShortLinkOutputDto {
  id: bigint;
  url: string;
  alias: string;
  published: boolean;
  userId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
