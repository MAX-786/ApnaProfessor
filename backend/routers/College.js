const path = require("path");
process.chdir(path.join(__dirname, "/.."));

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const collegeDB = require("../models/College");
const professorDB = require("../models/Professor");

router.post("/", async(req, res) => {
    const collegeData = new collegeDB({
        name: req.body.name,
        user_id: req.body.user_id,
    });

    await collegeData
        .save()
        .then((doc) => {
            res.status(201).send(doc);
        })
        .catch((err) => {
            res.status(400).send({
                message: "College not added successfully",
            });
        });
});

router.get("/", async(req, res) => {

    const options = {
        page: req.query.page || 1,
        limit: 10,
    };

    if (!req.query.q || req.query.q === "") {
        await collegeDB.paginate({}, options)
            .then((docs) => {
                res.status(200).send(docs);
            }).catch((err) => {
                res.status(400).send(err);
            });
    } else {
        await collegeDB.paginate({ name: { $regex: req.query.q, $options: "i" } }, options).then((docs) => {
            res.status(200).send(docs);
        }).catch((err) => {
            res.status(400).send(err);
        });
    }

});


router.get("/:id", async(req, res) => {

    const error = {
        message: "Error in retrieving colleges",
        error: "Bad request",
    };

    let college;
    await collegeDB.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }).then((c) => {
        college = c;
    }).catch((err) => {
        res.status(400).send(err);
    });

    // Fetching All Professos
    const options = {
        page: req.query.page || 1,
        limit: 10,
    };

    await professorDB.paginate({ college_id: req.params.id }, options)
        .then((data) => {
            res.status(200).send({
                ...data,
                college
            });
        })
        .catch((e) => {
            console.log("Error: ", e);
            res.status(400).send(error);
        });

});

module.exports = router;