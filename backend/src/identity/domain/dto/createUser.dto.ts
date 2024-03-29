export class CreateUserInputDto {
  email: string;
  username?: string;
  provider: string;
  image?: string;
}

export class CreateUserOutputDto {
  id: bigint;
  email: string;
  username: string;
  provider: string;
  image: string;
  emailVerifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
