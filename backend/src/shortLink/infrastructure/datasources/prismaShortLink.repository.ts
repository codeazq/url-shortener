import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateShortLinkInputDto,
  CreateShortLinkOutputDto,
} from 'src/shortLink/domain/dto/createShortLink.dto';
import { DeleteShortLinkOutputDto } from 'src/shortLink/domain/dto/deleteShortLink.dto';
import { FindShortLinkOutputDto } from 'src/shortLink/domain/dto/findShortLink.dto';
import {
  UpdateShortLinkInputDto,
  UpdateShortLinkOuptDto,
} from 'src/shortLink/domain/dto/updateShortLink.dto';
import ShortLinkRepository from 'src/shortLink/domain/repository/shortLink.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export default class PrismaShortLinkRepository implements ShortLinkRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createShortLinkInputDto: CreateShortLinkInputDto,
  ): Promise<CreateShortLinkOutputDto> {
    try {
      return await this.prismaService.shortLink.upsert({
        where: { alias: createShortLinkInputDto.alias },
        update: {},
        create: {
          userId: createShortLinkInputDto.userId,
          url: createShortLinkInputDto.url,
          alias: createShortLinkInputDto.alias,
          published: createShortLinkInputDto.published,
        },
      });
    } catch (error) {}
  }

  async findMany(): Promise<FindShortLinkOutputDto[]> {
    try {
      return await this.prismaService.shortLink.findMany();
    } catch (error) {}
  }

  async findManyByUserId(
    userId: bigint | number,
  ): Promise<FindShortLinkOutputDto[]> {
    return await this.prismaService.shortLink.findMany({ where: { userId } });
  }

  async find(id: number): Promise<FindShortLinkOutputDto> {
    try {
      return await this.prismaService.shortLink.findUnique({ where: { id } });
    } catch (error) {}
  }
  async findByAlias(alias: string): Promise<FindShortLinkOutputDto> {
    try {
      const where: Prisma.ShortLinkWhereInput = { alias: alias };

      return await this.prismaService.shortLink.findFirst({ where });
    } catch (error) {}
  }

  async update(
    id,
    updateShortLinkInputDto: UpdateShortLinkInputDto,
  ): Promise<UpdateShortLinkOuptDto> {
    const data: Prisma.ShortLinkUncheckedUpdateInput = {};
    if (updateShortLinkInputDto.alias)
      data.alias = updateShortLinkInputDto.alias;

    if (updateShortLinkInputDto.url) data.url = updateShortLinkInputDto.url;

    if (updateShortLinkInputDto.published)
      data.published = updateShortLinkInputDto.published;

    try {
      return await this.prismaService.shortLink.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {}
  }
  async delete(id: number): Promise<DeleteShortLinkOutputDto> {
    try {
      return await this.prismaService.shortLink.delete({
        where: {
          id,
        },
      });
    } catch (error) {}
  }
}
