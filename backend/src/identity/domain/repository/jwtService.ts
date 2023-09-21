export default interface JWTService {
  sign(payload: string | object, jwtSecret?: string): Promise<string>;
  verify(token: string, jwtSecret?: string);
}

// Token to associate with repository (nestjs DI)
export const JWTServiceName = 'JWTService';
