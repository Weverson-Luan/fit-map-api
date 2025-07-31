import PrismaUsersRepository from '@/repositories/prisma/users';
import { UserInvalidCreditialsError } from '../errors/users/invalid-credentials';
import { compare } from 'bcryptjs';
import { User } from 'generated/prisma';

interface IAutenticationUseCasePayload {
  email: string;
  password: string;
}

type IAuthenticationUseCaseResponse = {
  user: User;
};

export class AuthenticateUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    email,
    password,
  }: IAutenticationUseCasePayload): Promise<IAuthenticationUseCaseResponse> {
    // buscar usuário no banco pelo -email
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new UserInvalidCreditialsError();
    }

    // comparar se a senha salva no banco bate com a senha enviada pelo usuário
    const doesPasswordMatchs = compare(
      password,
      userAlreadyExists.password_hash,
    );

    if (!doesPasswordMatchs) {
      throw new UserInvalidCreditialsError();
    }

    // retornar o usuário logado
    return {
      user: userAlreadyExists,
    };
  }
}
