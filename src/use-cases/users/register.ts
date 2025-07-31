/**
 * IMPORTS
 */
import { hash } from 'bcryptjs';
import { UserRepository } from '@/repositories/prisma/users/users-repository';
import { UserAlreadyExistsError } from '../errors/users/user-already-exists';
import { User } from 'generated/prisma';

interface RegisterUseCaseResponse {
  user: User;
}

type IRegisterUserUseCase = {
  name: string;
  email: string;
  password: string;
};

/**
 * 1. Use case não precisa conhecer a implementação do repositorio
 * 2. Mas ele precisa saber quais metodos deve utilizar e quais dados ele pode enviar e receber
 */
export class RegisterUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: IRegisterUserUseCase): Promise<RegisterUseCaseResponse> {
    // GERANDO SENHA CRIPTOGRAFADA
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    // VALIDANDO REPOSITORIUSUÁRIO COMO MESMO E-MAIL
    if (userWithSameEmail) {
      // 409 -> Conflitos com dados duplicados
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
