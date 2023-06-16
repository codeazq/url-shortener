export class UpdateShortLinkInputDto {
  url?: string;
  alias?: string;
  published?: boolean;
}

export class UpdateShortLinkOuptDto {
  id: bigint;
  url: string;
  alias: string;
  published: boolean;
  userId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
