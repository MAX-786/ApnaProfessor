const path = require("path");
process.chdir(path.join(__dirname, "/.."));

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const collegeDB = require("../models/College");

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

router.get("/", (req, res) => {

    collegeDB.find({}).then((docs) => {
        res.status(201).send(docs);
    }).catch((err) => {
        res.status(400).send(err);
    });

});


router.get("/:id", (req, res) => {

    const error = {
        message: "Error in retrieving colleges",
        error: "Bad request",
    };


    collegeDB.aggregate([{
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
            },
            {
                $lookup: {
                    from: "professors",
                    let: { college_id: "$_id" },
                    pipeline: [{
                            $match: {
                                $expr: {
                                    $eq: ["$college_id", "$$college_id"],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                // user_id: 1,
                                name: 1,
                                courses: 1,
                                createdAt: 1,
                                // question_id: 1,
                            },
                        },
                    ],
                    as: "professors",
                },
            },
            // {
            //   $unwind: {
            //     path: "$answerDetails",
            //     preserveNullAndEmptyArrays: true,
            //   },
            // },
            {
                $project: {
                    __v: 0,
                    // _id: "$_id",
                    // answerDetails: { $first: "$answerDetails" },
                },
            },
        ])
        .exec()
        .then((collegeDetails) => {
            res.status(200).send(collegeDetails);
        })
        .catch((e) => {
            console.log("Error: ", e);
            res.status(400).send(error);
        });

});

module.exports = router;