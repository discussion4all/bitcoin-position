import {getMongoRepository,getConnection} from "typeorm";
import  {Request, Response} from 'express';

import {Settings} from "../entity/Settings";
import  {ObjectID} from 'mongodb';


exports.updateBitcoin = async (req :Request, res:Response) => {
	const settingsRepository = getMongoRepository(Settings);
	if(req.body.price){
		if(req.body.price > 0){
			const settingObject =await settingsRepository.findOne(1);
			const newSetting =  new Settings();
			if(settingObject == undefined){
				newSetting.updatedAt = new Date();
				newSetting.price = req.body.price;
				await settingsRepository.save(newSetting);
				res.send(newSetting);
			}else{
				await settingsRepository.update({ 'id': ObjectID(settingObject.id) },{price : req.body.price})
				res.send(settingObject);
			}
		}else{
			res.status(422).send({message : "Negative price can't be bitcoin price"});
		}
	}else{
		res.status(422).send({message : "Some value are missign"});
	}
	
	
}

exports.getBitcoin= async (req :Request, res:Response) => {
	const settingsRepository = getMongoRepository(Settings);
	const settingObject = await settingsRepository.findOne(1);
	res.send(settingObject);
}