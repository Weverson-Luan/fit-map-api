import PrismaUsersRepository from '@/repositories/prisma/users';
import { User } from 'generated/prisma';

interface IExampleUseCasePayload {
  email: string;
  password: string;
}

type IAuthenticationUseCaseResponse = {
  user: User | null;
};

export class ExampleUseCase {
  constructor(private exampleRepository: PrismaUsersRepository) {}

  async execute({
    email,
    password,
  }: IExampleUseCasePayload): Promise<IAuthenticationUseCaseResponse> {
    // buscar usuário no banco pelo -email

    // retornar o usuário logado
    return {
      user: null,
    };
  }
}
