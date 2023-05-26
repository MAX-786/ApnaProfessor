process.chdir(__dirname);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const path = require("path");
const app = express();
const router = require("./src/routers");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

// MongoDB database connection

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apnaprofessordb.2ajoplv.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
// const db = require('./db.js');
// db.connect();

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// api
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/dist")));

// Root api call
app.get("*", (req, res) => {
    try {
        res.sendFile(path.join(`${__dirname}/../frontend/dist/index.html`));
    } catch (e) {
        res.send("Welcome to KYPE");
    }
});

app.use(cors());

app.listen(PORT, () => {
    console.log(`KYPE API is running on PORT No- ${PORT}`);
});