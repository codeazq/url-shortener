export class UpdateShortLinkInputDto {
  url?: string;
  alias?: string;
  published?: boolean;
}

export class UpdateShortLinkOuptDto {
  id: number;
  url: string;
  alias: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
