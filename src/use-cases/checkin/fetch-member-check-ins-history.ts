import { CheckInsRepository } from '@/repositories/prisma/check-ins-repository/check-ins-repository';
import { CheckIn } from 'generated/prisma';

interface IFetchUserCheckInsHistoryPayload {
  userId: string;
  page: number;
}

type IFetchUserCheckInsHistoryResponse = {
  checkIns: CheckIn[];
};

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryPayload): Promise<IFetchUserCheckInsHistoryResponse> {
    const checkInsHistory = await this.checkInRepository.findManyByUserId(
      userId,
      page,
    );

    // retornar o usuário logado
    return {
      checkIns: checkInsHistory,
    };
  }
}
