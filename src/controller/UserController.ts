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
	if(req.body.name && req.body.username && req.body.email){
		const getUser =await userRepository.find({email : req.body.email});
	    if(getUser.length > 0){
	    	req.body.message = "Email already exists";
	    	res.status(409).send(req.body);
	    }else{
	    	const newUser = new User(req.body.name, req.body.username, req.body.email);
	    	await userRepository.save(newUser);
	    	res.send(newUser);
	    }
	}else{
		res.status(422).send({message : "Some value are missign"});
	}
    
}

exports.getUser = async (req, res) => {
	const userRepository = getMongoRepository(User);
    const getUser =await userRepository.find(ObjectID(req.params.id));
    if(getUser.length > 0){
    	res.status(200).send(getUser);
    }else{
    	res.status(204).send({message : "User not found"});
    }
}

exports.updateUser = async(req,res)=>{
	const userRepository = getMongoRepository(User);
	req.body.updatedAt = new Date();
    await userRepository.update({ 'id': ObjectID(req.params.id) },req.body)
	res.status(200).send(req.body);	
}