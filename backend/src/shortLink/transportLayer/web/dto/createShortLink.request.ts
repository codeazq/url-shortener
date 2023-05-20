import { IsUrl, Length, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortLinkRequestDto {
  @ApiProperty({
    example:
      'https://medium.com/@ebiyomarejonathan/understanding-clean-architecture-the-basics-5c889fec1c79',
    description: 'The full URL that needs a short link',
  })
  @IsUrl()
  url: string;

  @ApiProperty()
  @Length(1, 200)
  alias: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  published?: boolean = false;
}

export class CreateShortLinkResponseDto {
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
