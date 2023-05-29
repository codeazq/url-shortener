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
import JWTService, { JWTServiceName } from './repository/jwtService';
import { LoginOutputDto } from './dto/login.dto';

@Injectable()
export class IdentityService {
  constructor(
    @Inject(UserRepositoryName)
    private userRepository: UserRepository,

    @Inject(GoogleAuthServiceName)
    private googleAuthService: GoogleAuthService,

    @Inject(JWTServiceName)
    private jwtService: JWTService,
  ) {}

  async login(token: string): Promise<LoginOutputDto> {
    try {
      //verify that the token is valid
      const userDetails = await this.googleAuthService.verifyToken(token);

      // create an account for the user if one does not exist
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
      // return token to the user to be sent for subsequent requests to server
      return {
        user: { email: user.email, username: user.username, image: user.image },
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
}
