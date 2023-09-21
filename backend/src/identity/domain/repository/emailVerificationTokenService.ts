export default interface EmailVerificationTokenService {
  generateToken(payload: string | object): Promise<string>;

  verifyToken(token: string): Promise<boolean>;
}

// Token to associate with repository (nestjs DI)
export const EmailVerificationTokenServiceName =
  'EmailVerificationTokenService';
