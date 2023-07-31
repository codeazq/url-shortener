// import { UserRepository } from 'src/identity/domain/repository/user.repository';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserInputDto, CreateUserOutputDto } from './dto/createUser.dto';
import { UpdateUserInputDto, UpdateUserOutputDto } from './dto/updateUser.dto';
import { FindUserOutputDTO } from './dto/findUser.dto';
import UserRepository, {
  UserRepositoryName,
} from './repository/user.repository';
import GoogleAuthService, {
  GoogleAuthServiceName,
} from './repository/googleAuthService';
import { EmailVerificationException } from 'src/utilities/EmailVerificationException';
import JWTService, { JWTServiceName } from './repository/jwtService';
import { StatusCodes } from 'http-status-codes';
import { LoginOutputDto } from './dto/login.dto';
// import EmailService, { EmailServiceName } from './repository/emailService';
import getVerificationEmail from '../utils/emails/verificationEmail';
import EmailService, {
  EmailServiceName,
} from 'src/services/email/emailService';
import { appURL } from 'src/main';

@Injectable()
export class IdentityService {
  constructor(
    @Inject(UserRepositoryName)
    private userRepository: UserRepository,

    @Inject(GoogleAuthServiceName)
    private googleAuthService: GoogleAuthService,

    @Inject(JWTServiceName)
    private jwtService: JWTService,

    @Inject(EmailServiceName)
    private emailService: EmailService,
  ) {}

  async login(token: string): Promise<LoginOutputDto> {
    try {
      //verify that the token from provider(google) is valid
      const userDetails = await this.googleAuthService.verifyToken(token);

      let user = await this.findByEmail(userDetails.email);

      if (!user)
        user = await this.create({ ...userDetails, provider: 'google' });

      const jwtPayload = {
        iss: process.env.APP_NAME || 'url_shortner',
        sub: user.id,
        iat: new Date().getTime(),
      };

      // generate an jwt access token for the user
      const jwtToken = await this.jwtService.sign(jwtPayload);

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          image: user.image,
        },
        token: jwtToken,
      };
    } catch (error) {
      throw error;
    }
  }

  private async create(
    createUserInputDto: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    try {
      return await this.userRepository.create(createUserInputDto);
    } catch (error) {}
  }

  async findByEmail(email: string): Promise<FindUserOutputDTO> {
    try {
      return await this.userRepository.findUserByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async update(
    updateUserInputDto: UpdateUserInputDto,
  ): Promise<UpdateUserOutputDto> {
    try {
      return await this.userRepository.update(updateUserInputDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} identity`;
  }

  async sendEmailVerificationMail(userId: bigint | number): Promise<string> {
    try {
      const user = await this.userRepository.findUserById(userId);

      const emailVerificationToken = await this.generateTokenToVerifyEmail(
        user.email,
      );

      const verificationURL = `${appURL}/auth/verify_email/${emailVerificationToken}`;

      const emailContent = getVerificationEmail(user.username, verificationURL);

      this.emailService.sendMail({
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
        to: user.email,
        subject: `Please verify your ${process.env.APP_NAME} account`,
        text: '',
        html: emailContent,
      });

      return `verification email sent to ${user.email}`;
    } catch (error) {
      console.error(error);
    }
  }

  async verifyEmailToken(token: string) {
    try {
      const tokenPayload = await this.jwtService.verify(
        token,
        process.env.EMAIL_VERIFICATION_TOKEN_SECRET,
      );

      if (!tokenPayload) {
        throw new EmailVerificationException(
          'This e-mail confirmation is invalid. Please issue a new e-mail confirmation request.',
          StatusCodes.BAD_REQUEST,
        );
      }

      const user = await this.userRepository.findUserByEmail(tokenPayload.sub);

      if (user.emailVerifiedAt) return user;

      return await this.userRepository.update({
        email: tokenPayload.sub,
        emailVerifiedAt: new Date(),
      });
    } catch (error) {
      console.error(error);
    }
  }

  private async generateTokenToVerifyEmail(email: string) {
    try {
      const payload = {
        iss: process.env.APP_NAME || 'url_shortner',
        sub: email,
        exp23: new Date().getTime(),
      };
      const token = await this.jwtService.sign(
        payload,
        process.env.EMAIL_VERIFICATION_TOKEN_SECRET,
      );

      return token;
    } catch (error) {
      console.error(error);
    }
  }
}
