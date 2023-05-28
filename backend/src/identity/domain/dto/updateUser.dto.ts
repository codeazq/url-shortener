export class UpdateUserInputDto {
  id?: bigint;
  email?: string;
  username?: string;
  image?: string;
}

export class UpdateUserOutputDto {
  id: bigint;
  email: string;
  username: string;
  provider: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
