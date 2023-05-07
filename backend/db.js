process.chdir(__dirname);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apnaprofessordb.2ajoplv.mongodb.net/?retryWrites=true&w=majority`;

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