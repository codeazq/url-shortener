import { IsUrl, Length, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShortLinkRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty()
  @IsOptional()
  @Length(1, 200)
  alias?: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class UpdateShortLinkResponseDto {
  @ApiProperty()
  id: bigint;

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
