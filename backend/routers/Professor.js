const path = require("path");
process.chdir(path.join(__dirname, "/.."));

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const professorDB = require("../models/Professor");

router.post("/", async(req, res) => {
    const professorData = new professorDB({
        name: req.body.name,
        user_id: req.body.user_id,
        college_id: req.body.college_id,
        courses: req.body.courses,
    });

    await professorData
        .save()
        .then((doc) => {
            res.status(201).send(doc);
        })
        .catch((err) => {
            res.status(400).send({
                message: "Professor not added successfully",
            });
        });
});

router.get("/:id", (req, res) => {

    const error = {
        message: "Error in retrieving Professors",
        error: "Bad request",
    };


    professorDB.aggregate([{
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
            },
            {
                $lookup: {
                    from: "reviews",
                    let: { professor_id: "$_id" },
                    pipeline: [{
                            $match: {
                                $expr: {
                                    $eq: ["$professor_id", "$$professor_id"],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                // user_id: 1,
                                text: 1,
                                course: 1,
                                rating: 1,
                                user_id: 1,
                                createdAt: 1,
                                // question_id: 1,
                            },
                        },
                    ],
                    as: "reviews",
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
        .then((professorDetails) => {
            res.status(200).send(professorDetails);
        })
        .catch((e) => {
            console.log("Error: ", e);
            res.status(400).send(error);
        });


});

module.exports = router;