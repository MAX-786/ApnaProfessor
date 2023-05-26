const path = require("path");
process.chdir(path.join(__dirname, "/.."));

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const reviewDB = require("./../models/Review");
const userDB = require('../models/User');
const professorDB = require('../models/Professor');

router.post("/", async(req, res) => {
    const reviewData = new reviewDB({
        text: req.body.text,
        professor_id: req.body.professor_id,
        course: req.body.course,
        rating: req.body.rating,
        user_id: req.body.user_id,
        votes: 0,
        mandatory_attd: req.body.mandatory_attd,
    });

    await reviewData
        .save()
        .then(async(doc) => {
            await userDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.body.user_id) }, { $addToSet: { profs_reviewed: req.body.professor_id } });
            await professorDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.body.professor_id) }, { $inc: { review_count: 1, [`total_rating.star${req.body.rating}`]: 1 } });
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
    if (!req.body.isUpvoted) {
        await userDB
            .findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.body.user_id) }, { $pull: { reviews_voted: req.params.id } })
            .then(async(user) => {
                if (user === null) {
                    return res.status(404).send("User not found!");
                }
                await reviewDB
                    .findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) }, { $inc: { votes: -1 } }, { new: true, upsert: true })
                    .then(async(doc) => {
                        return res.status(201).send(doc);
                    })
                    .catch((err) => {
                        return res.status(400).send(err);
                    });
            })
            .catch((err) => {
                return res.status(400).send(err);
            });

    } else {
        await userDB
            .findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.body.user_id) }, { $push: { reviews_voted: req.params.id } })
            .then(async(user) => {
                if (user === null) {
                    return res.status(404).send("User not found!");
                }
                await reviewDB
                    .findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) }, { $inc: { votes: 1 } }, { new: true, upsert: true })
                    .then(async(doc) => {
                        return res.status(201).send(doc);
                    })
                    .catch((err) => {
                        return res.status(400).send(err);
                    });
            })
            .catch((err) => {
                return res.status(400).send(err);
            });

    }
});



module.exports = router;