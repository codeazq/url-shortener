export class LoginOutputDto {
  user: { id: bigint; email: string; username: string; image: string };
  token: string;
}
