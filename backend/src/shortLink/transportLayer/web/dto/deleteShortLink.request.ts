import { ApiProperty } from '@nestjs/swagger';

export class DeleteShortLinkResponseDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  alias: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
