import {getMongoRepository} from "typeorm";
import {User} from "../entity/User";

export class UserController {
    private userRepository = getMongoRepository(User);

    async createUser(name: string, username: string, email: string): Promise<User> {
        const newUser = new User(name, username, email);
        await this.userRepository.save(newUser);
        return newUser;
    }
}
