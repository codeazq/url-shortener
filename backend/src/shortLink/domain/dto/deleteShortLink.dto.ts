export class DeleteShortLinkOutputDto {
  id: number;
  url: string;
  alias: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
