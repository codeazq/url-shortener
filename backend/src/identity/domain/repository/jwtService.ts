export default interface JWTService {
  sign(payload: string | object): Promise<string>;
}

// Token to associate with repository (nestjs DI)
export const JWTServiceName = 'JWTService';
