import {getMongoRepository} from "typeorm";
import {User} from "../entity/User";

/*export class UserController {
    private userRepository = getMongoRepository(User);

    async createUser(name: string, username: string, email: string): Promise<User> {
        const newUser = new User(name, username, email);
        await this.userRepository.save(newUser);
        return newUser;
    }
}*/

exports.createUser = async (req, res) => {
	var userRepository = getMongoRepository(User);
    var name,username,email;
    const getUser =await userRepository.find();
    console.log("getUser",getUser)
    const newUser = new User(req.body.name, req.body.username, req.body.email);
    await userRepository.save(newUser);
    res.send(newUser);
}

exports.getUser = async (req, res) => {
	var userRepository = getMongoRepository(User);
    var name,username,email;
    const newUser = new User(req.body.name, req.body.username, req.body.email);
    await userRepository.save(newUser);
    res.send(newUser);
}