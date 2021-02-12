import {getMongoRepository,getConnection} from "typeorm";
import {Settings} from "../entity/Settings";
import  {ObjectID} from 'mongodb';


exports.updateBitcoin = async (req, res) => {
	const settingsRepository = getMongoRepository(Settings);
	if(req.body.price){
		const settingObject =await settingsRepository.findOne(1);
		const newSetting =  new Settings();
		if(settingObject == undefined){
			newSetting.price = req.body.price;
			await settingsRepository.save(newSetting);
			res.send(newSetting);
		}else{
			await settingsRepository.update({ 'id': ObjectID(settingObject.id) },{price : req.body.price})
			res.send(settingObject);
		}
	}else{
		res.status(422).send({message : "Some value are missign"});
	}
	
	
}

exports.getBitcoin= async (req, res) => {
	const settingsRepository = getMongoRepository(Settings);
	const settingObject = await settingsRepository.findOne(1);
	res.send(settingObject);
}