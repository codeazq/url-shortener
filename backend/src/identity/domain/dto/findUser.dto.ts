export class FindUserOutputDTO {
  id: bigint;
  email: string;
  username: string;
  provider: string;
  image: string;
  emailVerifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
