import { Injectable } from '@nestjs/common';
import {
  CreateUserInputDto,
  CreateUserOutputDto,
} from 'src/identity/domain/dto/createUser.dto';
import { FindUserOutputDTO } from 'src/identity/domain/dto/findUser.dto';
import {
  UpdateUserInputDto,
  UpdateUserOutputDto,
} from 'src/identity/domain/dto/updateUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import UserRepository from 'src/identity/domain/repository/user.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export default class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createUserInputDto: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    const data: Prisma.UserUncheckedCreateInput = {
      email: createUserInputDto.email,
      provider: createUserInputDto.provider,
    };
    if (createUserInputDto.username)
      data.username = createUserInputDto.username;

    if (createUserInputDto.image) data.image = createUserInputDto.image;

    try {
      const user = await this.prismaService.user.upsert({
        where: { email: createUserInputDto.email },
        update: {},
        create: data,
      });

      return user;
    } catch (error) {}
  }

  async update(
    updateUserInputDto: UpdateUserInputDto,
  ): Promise<UpdateUserOutputDto> {
    const where: Prisma.UserWhereUniqueInput = {};
    if (updateUserInputDto.id) where.id = updateUserInputDto.id;
    if (updateUserInputDto.email) where.email = updateUserInputDto.email;

    const data: Prisma.UserUncheckedUpdateInput = {};
    if (updateUserInputDto.username)
      data.username = updateUserInputDto.username;
    if (updateUserInputDto.image) data.email = updateUserInputDto.image;

    try {
      const user = await this.prismaService.user.update({
        where,
        data,
      });

      return user;
    } catch (error) {}
  }
  async findUserByEmail(email: string): Promise<FindUserOutputDTO> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {}
  }
}
