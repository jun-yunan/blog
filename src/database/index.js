const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        const connect = await mongoose.connect(
            // `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.vtrs6li.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`,
            `mongodb+srv://jun-yunan:0794210593Zed@cluster0.jy85qob.mongodb.net/WebsiteSales?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        connect && console.log(`Connect database ${process.env.NAME_DB} successfully!!!`);
    } catch (error) {
        console.log(`Connect database ${process.env.NAME_DB} failure!!!`);
        console.log(error);
    }
}

module.exports = { connect };
