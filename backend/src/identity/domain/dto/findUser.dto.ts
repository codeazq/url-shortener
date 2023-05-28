export class FindUserOutputDTO {
  id: bigint;
  email: string;
  username: string;
  provider: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
