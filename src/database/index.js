const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        // await mongoose.connect(`${process.env.DB}${databaseConfig.dbName}`, {
        const connect = await mongoose.connect(
            `mongodb+srv://jun-yunan:${process.env.PASSWORD}@cluster0.vtrs6li.mongodb.net/WebsiteSales?retryWrites=true&w=majority`,
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // },
        );
        console.log(`Connect database WebsiteSales successfully!!!`);
    } catch (error) {
        console.log(`Connect database WebsiteSales failure!!!`);
        console.log(error);
    }
}

module.exports = { connect };
