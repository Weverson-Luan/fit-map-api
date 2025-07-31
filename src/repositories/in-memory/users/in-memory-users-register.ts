import { Prisma, User } from 'generated/prisma';
import { UserRepository } from '../../prisma/users/users-repository';

export default class InMemoryUsersRepository implements UserRepository {
  public users: User[] = [];

  /**
   * Criar dados para um novo usuário.
   *
   * @param data  Prisma.UserCreateInput
   */
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findById(useId: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === useId) as User | null;

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userAlreadyExiste = this.users.find(
      (user) => user.email === email,
    ) as User | null;

    return userAlreadyExiste;
  }
}
