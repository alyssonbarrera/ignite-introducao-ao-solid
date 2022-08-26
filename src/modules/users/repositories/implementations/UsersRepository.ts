import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  findUser({id, email}: {id?: string, email?: string}): User | undefined {
    const user = this.users.find(user => user.id === id || user.email === email);

    return user;
  }

  create({ name, email }: ICreateUserDTO): User {

    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.findUser({ id });
  }

  findByEmail(email: string): User | undefined {
    return this.findUser({ email });
  }

  turnAdmin(receivedUser: User): User {
    const user = this.findUser({ id: receivedUser.id });

    user.admin = true;
  
    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
