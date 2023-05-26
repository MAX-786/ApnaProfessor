process.chdir(__dirname);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.DB_URL;

module.exports.connect = () => {
    mongoose.connect(url, {
            useNewUrlParser: true,
            // useFindAndModify: false,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        .then(() => console.log("MongoDB is connected successfully"))
        .catch((err) => console.log("Error: ", err));
};