export class UpdateUserInputDto {
  id?: bigint;
  email?: string;
  username?: string;
  image?: string;
  emailVerifiedAt?: Date;
}

export class UpdateUserOutputDto {
  id: bigint;
  email: string;
  username: string;
  provider: string;
  image: string;
  emailVerifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
