import {getMongoRepository} from "typeorm";
import  {Request, Response} from 'express';
import {User} from "../entity/User";
import {Settings} from "../entity/Settings";
import  {ObjectID} from 'mongodb';
/*export class UserController {
    private userRepository = getMongoRepository(User);

    async createUser(name: string, username: string, email: string): Promise<User> {
        const newUser = new User(name, username, email);
        await this.userRepository.save(newUser);
        return newUser;
    }
}*/

exports.createUser = async (req:Request, res:Response) => {
	const userRepository = getMongoRepository(User);
	if(req.body.name && req.body.name != " " && req.body.username && req.body.username != " " && req.body.email && req.body.email != " "){
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

exports.getUser = async (req:Request, res:Response) => {
	const userRepository = getMongoRepository(User);
	if(ObjectID.isValid(req.params.id)){
	    const getUser =await userRepository.find(ObjectID(req.params.id));
	    if(getUser.length > 0){
	    	res.status(200).send(getUser);
	    }else{
	    	res.status(204).send({message : "User not found"});
	    }
	}else{
		res.status(422).send({message : "Parameter missing or invalid"});
	}
}

exports.updateUser = async(req:Request,res:Response)=>{
	if(ObjectID.isValid(req.params.id)){
		const userRepository = getMongoRepository(User);
		req.body.updatedAt = new Date();
	    await userRepository.update({ 'id': ObjectID(req.params.id) },req.body)
		res.status(200).send(req.body);
	}else{
		res.status(422).send({message : "Parameter missing or invalid"});
	}
		
}

exports.addUsdInUser = async (req:Request,res:Response)=>{
	const userRepository = getMongoRepository(User);
	if(ObjectID.isValid(req.params.id)){
		const getUser = await userRepository.find(ObjectID(req.params.id));
		if(getUser.length > 0){
			if(req.body.action && req.body.action != " " 
				&&  req.body.amount && req.body.amount != " "){
				if(req.body.amount > 0){
					if(req.body.action == "withdraw"){
						if(Number(req.body.amount) < Number(getUser[0].usdBalance)){
							let reqObject = {
								usdBalance :  Number(getUser[0].usdBalance) - Number(req.body.amount) 
							}
							await userRepository.update({ 'id': ObjectID(req.params.id) },reqObject)
							res.status(200).send(req.body);
						}else{
							res.status(422).send({message : "Amount is not withdrawable"});
						}
					}else if(req.body.action == "deposit"){
						let reqObject = {
							usdBalance : Number(req.body.amount) + Number(getUser[0].usdBalance)
						}
						await userRepository.update({ 'id': ObjectID(req.params.id) },reqObject)
						res.status(200).send(req.body);
					}else{
						res.status(422).send({message : "Some value are missign"});
					}
				}else{
					res.status(422).send({message : "Negative amount can't be "+ req.body.action});
				}
				
			}else{
				res.status(422).send({message : "Some value are missign"});
			}
		}else{
			res.status(422).send({message : "User not found"});
		}
	}else{
		res.status(422).send({message : "Parameter missing or invalid"});
	}
}

exports.addBitcoinsInUser =async (req:Request,res:Response)=>{
	const userRepository = getMongoRepository(User);
	if(ObjectID.isValid(req.params.id)){
		const getUser = await userRepository.find(ObjectID(req.params.id));
		if(getUser.length > 0){
			if(req.body.action && req.body.action != " " 
				&&  req.body.amount && req.body.amount != " "){
				if(req.body.amount > 0){
					if(req.body.action == "buy"){
						let reqObject = {
							bitcoinAmount : Number(req.body.amount) + Number(getUser[0].bitcoinAmount)
						}
						await userRepository.update({ 'id': ObjectID(req.params.id) },reqObject)
						res.status(200).send(req.body);
					}else if(req.body.action == "sell"){
						if(Number(req.body.amount) < Number(getUser[0].bitcoinAmount)){
							let reqObject = {
								bitcoinAmount :  Number(getUser[0].bitcoinAmount) - Number(req.body.amount) 
							}
							await userRepository.update({ 'id': ObjectID(req.params.id) },reqObject)
							res.status(200).send(req.body);
						}else{
							res.status(422).send({message : "You have not enough bitcoin for sell"});
						}
					}else{
						res.status(422).send({message : "Some value are missign"});
					}
				}else{
					res.status(422).send({message : "Amount can't be negative"});
				}
			}else{
				res.status(422).send({message : "Some value are missign"});
			}
		}else{
			res.status(422).send({message : "User not found"});
		}
	}else{
		res.status(422).send({message : "Parameter missing or invalid"});
	}
}

exports.userBalance = async(req:Request,res:Response)=>{
	const userRepository = getMongoRepository(User);
	const settingsRepository = getMongoRepository(Settings);
	if(ObjectID.isValid(req.params.id)){
		const getUser = await userRepository.find(ObjectID(req.params.id));
		const settingObject = await settingsRepository.findOne(1);
		if(getUser.length > 0 && settingObject){
			let bitcoinbalance = Number(settingObject.price) * Number(getUser[0].bitcoinAmount);
			bitcoinbalance = Number(bitcoinbalance.toFixed(0));
			let resObject = {
				balance :   Number(getUser[0].usdBalance) + Number(bitcoinbalance)
			}
			res.status(200).send(resObject);
		}else{
			res.status(422).send({message : "Information not found"});
		}
	}else{
		res.status(422).send({message : "Parameter missing or invalid"});
	}
}