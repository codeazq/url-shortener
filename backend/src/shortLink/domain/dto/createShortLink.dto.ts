export class CreateShortLinkInputDto {
  url: string;
  alias: string;
  published?: boolean;
}

export class CreateShortLinkOutputDto {
  id: number;
  url: string;
  alias: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
