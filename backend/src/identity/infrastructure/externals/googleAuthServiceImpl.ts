import { Injectable } from '@nestjs/common';
import GoogleAuthService, {
  VerifyTokenOutputDto,
} from 'src/identity/domain/repository/googleAuthService';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export default class GoogleAuthServiceImpl implements GoogleAuthService {
  async verifyToken(token: string): Promise<VerifyTokenOutputDto> {
    try {
      const client: OAuth2Client = new OAuth2Client(process.env.GOOGLE_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: client._clientId,
      });
      const payload: TokenPayload = ticket.getPayload();
      if (payload) {
        const userDetails = {
          email: payload.email,
          username: payload.name,
          image: payload.picture,
        };
        return userDetails;
      } else {
        throw new Error('Invalid token payload.');
      }
    } catch (error) {
      throw new Error('Failed to verify Google OAuth token.');
    }
  }
}
