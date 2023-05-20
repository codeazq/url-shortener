import { FindShortLinkOutputDto } from '../dto/findShortLink.dto';
import {
  CreateShortLinkInputDto,
  CreateShortLinkOutputDto,
} from '../dto/createShortLink.dto';
import {
  UpdateShortLinkInputDto,
  UpdateShortLinkOuptDto,
} from '../dto/updateShortLink.dto';
import { DeleteShortLinkOutputDto } from '../dto/deleteShortLink.dto';

export default interface ShortLinkRepository {
  create(data: CreateShortLinkInputDto): Promise<CreateShortLinkOutputDto>;
  findMany(): Promise<FindShortLinkOutputDto[]>;
  find(id: number): Promise<FindShortLinkOutputDto>;
  findByAlias(alias: string): Promise<FindShortLinkOutputDto>;
  update(id, data: UpdateShortLinkInputDto): Promise<UpdateShortLinkOuptDto>;
  delete(id: number): Promise<DeleteShortLinkOutputDto>;
}

// Token to associate with repository (nestjs DI)
export const ShortLinkRepositoryName = 'ShortLinkRepository';
