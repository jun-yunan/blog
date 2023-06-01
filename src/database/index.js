const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        const connect = await mongoose.connect(
            `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.jy85qob.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`,
            // `${process.env.DB_LOCAL + process.env.DB_LOCAL_NAME}`,
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
