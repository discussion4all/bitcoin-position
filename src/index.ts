import { app} from "./app";
import {createConnection} from "typeorm";
import {getMongoRepository} from "typeorm";
import {Settings} from "./entity/Settings";

createConnection().then(async () => {
    await setBitCoinValueIfNotExist();
    app.listen(5000, () => {
        console.log('Server is listening on port 5000');
    });
});

const setBitCoinValueIfNotExist = async () => {
    const settingsRepository = getMongoRepository<Settings>(Settings);
    const bitcoinValueFromDb = await settingsRepository.findOne(1);
    if (bitcoinValueFromDb == undefined) {
        const bitCoinVal = new Settings();
        bitCoinVal.price = 100;
        await settingsRepository.save(bitCoinVal);
    }
}
