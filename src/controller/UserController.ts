import {getMongoRepository} from "typeorm";
import {User} from "../entity/User";
import  {ObjectID} from 'mongodb';
/*export class UserController {
    private userRepository = getMongoRepository(User);

    async createUser(name: string, username: string, email: string): Promise<User> {
        const newUser = new User(name, username, email);
        await this.userRepository.save(newUser);
        return newUser;
    }
}*/

exports.createUser = async (req, res) => {
	const userRepository = getMongoRepository(User);
    const getUser =await userRepository.find({email : req.body.email});
    if(getUser.length > 0){
    	req.body.message = "Email already exists";
    	res.status(409).send(req.body);
    }else{
    	const newUser = new User(req.body.name, req.body.username, req.body.email);
    	await userRepository.save(newUser);
    	res.send(newUser);
    }
}

exports.getUser = async (req, res) => {
	const userRepository = getMongoRepository(User);
	const whereObject = {id : ObjectID(req.params.id)};
	console.log("whereObject",whereObject)
    const getUser =await userRepository.find(ObjectID(req.params.id));
    res.status(200).send(getUser);
}