import { app} from "./app";
import {createConnection} from "typeorm";
import {getMongoRepository} from "typeorm";
import {Setting} from "./entity/Setting";

createConnection().then(async () => {
    await setBitCoinValueIfNotExist();
    app.listen(5000, () => {
        console.log('Server is listening on port 5000');
    });
});

const setBitCoinValueIfNotExist = async () => {
    const settingsRepository = getMongoRepository<Setting>(Setting);
    const bitcoinValueFromDb = await settingsRepository.find({key: 'bitcoin'});
    if (bitcoinValueFromDb.length < 1) {
        const bitCoinVal = new Setting();
        bitCoinVal.key = 'bitcoin';
        bitCoinVal.value = 100;
        await settingsRepository.save(bitCoinVal);
    }
}
