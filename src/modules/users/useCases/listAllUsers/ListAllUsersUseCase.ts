import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const findUserAdmin = this.usersRepository.findById(user_id);

    if (!user_id || findUserAdmin.admin === false) {
      throw new Error("Unauthorized");

    } else if (!findUserAdmin) {
      throw new Error("User not found");
    }

    const users = this.usersRepository.list();

    if (!users) {
      throw new Error("Users not found");
      
    } else {
      return users;
    }
  }
}

export { ListAllUsersUseCase };
