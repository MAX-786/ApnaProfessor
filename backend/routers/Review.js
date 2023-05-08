const path = require("path");
process.chdir(path.join(__dirname, "/.."));

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const reviewDB = require("../models/Review");
const userDB = require('../models/User');

router.post("/", async(req, res) => {
    const reviewData = new reviewDB({
        text: req.body.text,
        professor_id: req.body.professor_id,
        course: req.body.course,
        rating: req.body.rating,
        user_id: req.body.user_id,
        votes: 0,
    });

    await reviewData
        .save()
        .then(async(doc) => {
            await userDB.findOneAndUpdate(req.body.user_id, { $push: { profs_reviewed: req.body.professor_id } });
            res.status(201).send(doc);
        })
        .catch((err) => {
            res.status(400).send({
                message: "Review not added successfully",
                data: err,
            });
        });
});

// API for handling Vote button
router.post('/:id', async(req, res) => {

    if (!req.body.checked) {
        await reviewDB.findOneAndUpdate(req.params.id, { $inc: { votes: -1 } })
            .then(async(doc) => {
                await userDB.findOneAndUpdate(doc.user_id, { $pull: { reviews_voted: req.params.id } });
                res.status(201).send(doc);

            }).catch((err) => {
                res.status(400).send(err);
            });
    } else {

        await reviewDB.findOneAndUpdate(req.params.id, { $inc: { votes: 1 } })
            .then(async(doc) => {
                await userDB.findOneAndUpdate(doc.user_id, { $push: { reviews_voted: req.params.id } });
                res.status(201).send(doc);

            }).catch((err) => {
                res.status(400).send(err);
            });
    }
});


module.exports = router;