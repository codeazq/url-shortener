import { Injectable, Inject } from '@nestjs/common';
import {
  CreateShortLinkInputDto,
  CreateShortLinkOutputDto,
} from './dto/createShortLink.dto';
import { FindShortLinkOutputDto } from './dto/findShortLink.dto';
import {
  UpdateShortLinkInputDto,
  UpdateShortLinkOuptDto,
} from './dto/updateShortLink.dto';
import { DeleteShortLinkOutputDto } from './dto/deleteShortLink.dto';
import ShortLinkRepository, {
  ShortLinkRepositoryName,
} from './repository/shortLink.repository';

@Injectable()
export class ShortLinkService {
  constructor(
    @Inject(ShortLinkRepositoryName)
    private shortLinkRepository: ShortLinkRepository,
  ) {}

  async create(
    createShortLinkInputDto: CreateShortLinkInputDto,
  ): Promise<CreateShortLinkOutputDto> {
    try {
      return await this.shortLinkRepository.create(createShortLinkInputDto);
    } catch (error) {}
  }

  async findAll(): Promise<FindShortLinkOutputDto[]> {
    try {
      return await this.shortLinkRepository.findMany();
    } catch (error) {}
  }

  async findOne(id: number): Promise<FindShortLinkOutputDto> {
    try {
      return await this.shortLinkRepository.find(id);
    } catch (error) {}
  }

  async findOneByAlias(alias: string): Promise<FindShortLinkOutputDto> {
    try {
      return await this.shortLinkRepository.findByAlias(alias);
    } catch (error) {}
  }

  async update(
    id: number,
    updateShortLinkInputDto: UpdateShortLinkInputDto,
  ): Promise<UpdateShortLinkOuptDto> {
    try {
      return await this.shortLinkRepository.update(id, updateShortLinkInputDto);
    } catch (error) {}
  }

  async remove(id: number): Promise<DeleteShortLinkOutputDto> {
    try {
      return await this.shortLinkRepository.delete(id);
    } catch (error) {}
  }
}
