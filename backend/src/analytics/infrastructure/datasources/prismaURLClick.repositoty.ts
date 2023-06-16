import { Injectable } from '@nestjs/common';
import { CreateURLClickOutputDto } from 'src/analytics/domain/dto/CreateURLClickDto';
import { FindURLClickOutputDto } from 'src/analytics/domain/dto/FindURLClickDto';
import URLClickRepository from 'src/analytics/domain/repository/urlClick.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export default class PrismaURLClickRepository implements URLClickRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(CreateURLClickInputDto: any): Promise<CreateURLClickOutputDto> {
    throw new Error('Method not implemented.');
  }
  findByUrlId(id: bigint): Promise<FindURLClickOutputDto[]> {
    throw new Error('Method not implemented.');
  }
}
