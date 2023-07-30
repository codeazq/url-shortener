import { CreateUserInputDto, CreateUserOutputDto } from '../dto/createUser.dto';
import { FindUserOutputDTO } from '../dto/findUser.dto';
import { UpdateUserInputDto, UpdateUserOutputDto } from '../dto/updateUser.dto';

export default interface UserRepository {
  create(data: CreateUserInputDto): Promise<CreateUserOutputDto>;
  update(data: UpdateUserInputDto): Promise<UpdateUserOutputDto>;
  findUserByEmail(email: string): Promise<FindUserOutputDTO>;
  findUserById(id: bigint | number): Promise<FindUserOutputDTO>;
}

// Token to associate with repository (nestjs DI)
export const UserRepositoryName = 'UserRepository';
