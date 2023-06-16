import {
  CreateURLClickInputDto,
  CreateURLClickOutputDto,
} from '../dto/createURLClickDto';
import { FindURLClickOutputDto } from '../dto/findURLClickDto';

export interface UrlClicksCount {
  shortLinkId: bigint;
  count: number;
}
export default interface URLClickRepository {
  create(
    createURLClickInputDto: CreateURLClickInputDto,
  ): Promise<CreateURLClickOutputDto>;
  findByUrlId(id: bigint): Promise<FindURLClickOutputDto[]>;
  findNoOfClicksByShortLinkIds(ids: bigint[]): Promise<UrlClicksCount[]>;
}

// Token to associate with repository (nestjs DI)
export const URLClickRepositoryName = 'URLClickRepository';
