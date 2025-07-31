/**
 * Caso de uso de cadastro de um usuário
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';

import InMemoryUsersRepository from '@/repositories/in-memory/users/in-memory-users-register';

import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from '../errors/resource/resource-not-found-error';

/**
 * 1. Deve ser possivel buscar por um usuário com id válido.
 *
 * 2. Não deve ser possivel buscar por um usuário com id inválido.
 *
 */

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  //EXECUTAR ANTES DE CADA SUITE TESTE
  beforeEach(() => {
    // instânciando o meu repositorio
    usersRepository = new InMemoryUsersRepository();

    // instânciando o meu caso de uso
    sut = new GetUserProfileUseCase(usersRepository);
  });
  it('deve ser possivel buscar por um usuário com id válido.', async () => {
    const userCreate = await usersRepository.create({
      name: 'Luan Dev',
      email: 'luandev@gmail.com',
      password_hash: await hash('123456', 6),
    });

    // fazendo o registro de um usuário
    const { user } = await sut.execute({
      userId: userCreate.id,
    });

    // espero que quando criar usuario me retorna um id do tipo string
    expect(user.name).toEqual('Luan Dev');
  });

  it('não deve ser possivel buscar por um usuário com id inválido.', async () => {
    await usersRepository.create({
      name: 'Luan Dev',
      email: 'luandev@gmail.com',
      password_hash: await hash('123456', 6),
    });

    // fazendo o registro de um usuário
    const response = sut.execute({
      userId: 'non-exixsting-id',
    });

    // espero que seja verdadeiro
    await expect(() => response).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
