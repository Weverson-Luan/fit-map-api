/**
 * Caso de uso de cadastro de um usuário
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { compare } from 'bcryptjs';

import InMemoryUsersRepository from '@/repositories/in-memory/users/in-memory-users-register';

import { RegisterUseCase } from './register';
import { UserAlreadyExistsError } from '../errors/users/user-already-exists';

/**
 * 1. Deve ser possivel resgistrar um usuário.
 *
 * 2. Deve ser possivel fazer o hash da senha ao registar um usuário.
 *
 * 3. Não deve ser possivel registrar um usuário duplicado com mesmo e-mail
 */

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  //EXECUTAR ANTES DE CADA SUITE TESTE
  beforeEach(() => {
    // instânciando o meu repositorio
    usersRepository = new InMemoryUsersRepository();

    // instânciando o meu caso de uso
    sut = new RegisterUseCase(usersRepository);
  });
  it('Deve ser possivel resgistrar um usuário', async () => {
    // instânciando o meu repositorio
    const usersRepository = new InMemoryUsersRepository();

    // instânciando o meu caso de uso
    const registerUserCase = new RegisterUseCase(usersRepository);

    // fazendo o registro de um usuário
    const { user } = await registerUserCase.execute({
      name: 'Luan Dev',
      email: 'luandev@gmail.com',
      password: '123456',
    });

    // espero que quando criar usuario me retorna um id do tipo string
    expect(user.id).toEqual(expect.any(String));
  });

  it('deve ser possivel fazer o hash da senha ao registar um usuário.', async () => {
    // instânciando o meu repositorio
    const usersRepository = new InMemoryUsersRepository();

    // instânciando o meu caso de uso
    const registerUserCase = new RegisterUseCase(usersRepository);

    // fazendo o registro de um usuário
    const { user } = await registerUserCase.execute({
      name: 'Luan Dev',
      email: 'luandev@gmail.com',
      password: '123456',
    });

    //validar se a senha foi hasheada com sucesso
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    // espero que seja verdadeiro
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('não deve ser possivel registrar um usuário duplicado com mesmo e-mail.', async () => {
    const email = 'luandev@gmail.com';

    // fazendo o registro de um usuário
    await sut.execute({
      name: 'Luan Dev',
      email,
      password: '123456',
    });

    // essa chamada precisa lançar um error to tipo UserAlreadyExistsError
    const responseError = sut.execute({
      name: 'Luan Dev',
      email,
      password: '123456',
    });

    // espero que seja verdadeiro
    await expect(() => responseError).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    );
  });
});
