import { Injectable } from '@nestjs/common';
import {
  CreateURLClickOutputDto,
  CreateURLClickInputDto,
} from 'src/analytics/domain/dto/CreateURLClickDto';
import { FindURLClickOutputDto } from 'src/analytics/domain/dto/FindURLClickDto';
import URLClickRepository from 'src/analytics/domain/repository/urlClick.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export default class PrismaURLClickRepository implements URLClickRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createURLClickInputDto: CreateURLClickInputDto,
  ): Promise<CreateURLClickOutputDto> {
    try {
      const urlClick = this.prismaService.urlClicks.create({
        data: createURLClickInputDto,
      });
      return urlClick;
    } catch (error) {
      throw error;
    }
  }
  findByUrlId(id: bigint): Promise<FindURLClickOutputDto[]> {
    throw new Error('Method not implemented.');
  }
}
