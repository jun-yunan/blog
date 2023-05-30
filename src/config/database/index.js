const mongoose = require('mongoose');
const databaseConfig = require('./databaseConfig');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(`${process.env.DB}${databaseConfig.dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connect database ${databaseConfig.dbName} successfully!!!`);
    } catch (error) {
        console.log(`Connect database ${databaseConfig.dbName} failure!!!`);
        console.log(error);
    }
}

module.exports = { connect };
