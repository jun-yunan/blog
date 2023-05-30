const mongoose = require('mongoose');
const databaseConfig = require('./databaseConfig');
require('dotenv').config();

async function connect() {
    try {
        // await mongoose.connect(`${process.env.DB}${databaseConfig.dbName}`, {
        const connect = await mongoose.connect(
            `mongodb+srv://jun-yunan:${process.env.PASSWORD}@cluster0.vtrs6li.mongodb.net/WebsiteSales?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        connect && console.log(`Connect database ${databaseConfig.dbName} successfully!!!`);
    } catch (error) {
        console.log(`Connect database ${databaseConfig.dbName} failure!!!`);
        console.log(error);
    }
}

module.exports = { connect };
