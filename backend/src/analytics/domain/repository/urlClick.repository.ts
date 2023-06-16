import {
  CreateURLClickInputDto,
  CreateURLClickOutputDto,
} from '../dto/CreateURLClickDto';
import { FindURLClickOutputDto } from '../dto/FindURLClickDto';
export default interface URLClickRepository {
  create(
    createURLClickInputDto: CreateURLClickInputDto,
  ): Promise<CreateURLClickOutputDto>;
  findByUrlId(id: bigint): Promise<FindURLClickOutputDto[]>;
}

// Token to associate with repository (nestjs DI)
export const URLClickRepositoryName = 'URLClickRepository';
