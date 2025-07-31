import { Prisma, User } from 'generated/prisma';

/**
 * Contrato para repositório de usuários.
 * Define os métodos de acesso e persistência de dados relacionados à entidade User.
 */
interface UserRepository {
  /**
   * Busca um usuário pelo id.
   *
   * @param userId - O userId do usuário a ser buscado.
   * @returns O usuário correspondente, se encontrado, ou null caso não exista.
   *
   * @example
   * const user = await userRepository.findById(userId);
   */
  findById(userId: string): Promise<User | null>;

  /**
   * Busca um usuário pelo endereço de e-mail.
   *
   * @param email - O e-mail do usuário a ser buscado.
   * @returns O usuário correspondente, se encontrado, ou null caso não exista.
   *
   * @example
   * const user = await userRepository.findByEmail('joao@email.com');
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Criar um novo usuário no banco de dados.
   *
   * @param data - Objeto com os dados necessários para criar um novo usuário,
   *              seguindo o tipo Prisma.UserCreateInput.
   * @returns O usuário recém-criado com os dados persistidos.
   *
   * @example
   * const user = await userRepository.create({
   *   name: 'Luan de Sousa',
   *   email: 'luan@email.com',
   *   password: 'senhaHash',
   * });
   */
  create(data: Prisma.UserCreateInput): Promise<User>;
}

/**
 * EXPORTS
 */
export { UserRepository };
