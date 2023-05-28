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
import { ShortLinkException } from 'src/utilities/ShortLinkException';
import { StatusCodes } from 'http-status-codes';
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

  async findAll(userId: bigint | number): Promise<FindShortLinkOutputDto[]> {
    try {
      return await this.shortLinkRepository.findManyByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    id: number,
    userId: bigint | number,
  ): Promise<FindShortLinkOutputDto> {
    try {
      const shortLink = await this.shortLinkRepository.find(id);
      console.log(`current userId: ${userId}`);
      console.log(`shortlink userId: ${shortLink.userId}`);
      if (shortLink.userId != userId)
        throw new ShortLinkException(
          'The shortLink was not created by this user',
          StatusCodes.FORBIDDEN,
        );

      return shortLink;
    } catch (error) {
      throw error;
    }
  }

  async findOneByAlias(alias: string): Promise<FindShortLinkOutputDto> {
    try {
      return await this.shortLinkRepository.findByAlias(alias);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateShortLinkInputDto: UpdateShortLinkInputDto,
    userId: bigint | number,
  ): Promise<UpdateShortLinkOuptDto> {
    try {
      const shortLink = await this.shortLinkRepository.find(id);

      if (shortLink.userId != userId)
        throw new ShortLinkException(
          'The shortLink was not created by this user',
          StatusCodes.FORBIDDEN,
        );

      return await this.shortLinkRepository.update(id, updateShortLinkInputDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(
    id: number,
    userId: bigint | number,
  ): Promise<DeleteShortLinkOutputDto> {
    try {
      const shortLink = await this.shortLinkRepository.find(id);
      if (shortLink.userId != userId)
        throw new ShortLinkException(
          'The shortLink was not created by this user',
          StatusCodes.FORBIDDEN,
        );
      return await this.shortLinkRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
