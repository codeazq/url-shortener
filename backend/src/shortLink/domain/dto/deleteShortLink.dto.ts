export class DeleteShortLinkOutputDto {
  id: bigint;
  url: string;
  alias: string;
  published: boolean;
  userId: bigint;
  createdAt: Date;
  updatedAt: Date;
}
