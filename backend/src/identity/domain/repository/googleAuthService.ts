export default interface GoogleAuthService {
  verifyToken(token: string): Promise<VerifyTokenOutputDto>;
}

export interface VerifyTokenOutputDto {
  email: string;
  username: string;
  image: string;
}

// Token to associate with repository (nestjs DI)
export const GoogleAuthServiceName = 'GoogleAuthService';
