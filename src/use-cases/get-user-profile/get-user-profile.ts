import PrismaUsersRepository from '@/repositories/prisma/users';
import { User } from 'generated/prisma';
import { ResourceNotFoundError } from '../errors/resource/resource-not-found-error';

interface IGetUserProfileUseCasePayload {
  userId: string;
}

type IGetUserProfileUseCaseResponse = {
  user: User;
};

export class GetUserProfileUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCasePayload): Promise<IGetUserProfileUseCaseResponse> {
    // buscar usuário no banco pelo useId
    const userAlreadyExists = await this.usersRepository.findById(userId);

    if (!userAlreadyExists) {
      throw new ResourceNotFoundError();
    }

    // retornar o usuário logado
    return {
      user: userAlreadyExists,
    };
  }
}
