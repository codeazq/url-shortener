export class LoginOutputDto {
  user: { email: string; username: string; image: string };
  token: string;
}
