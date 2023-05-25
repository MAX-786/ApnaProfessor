const path = require("path");
process.chdir(path.join(__dirname, "/.."));

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const professorDB = require("../models/Professor");
const reviewDB = require("../models/Review");
const collegeDB = require('../models/College');

router.post("/", async(req, res) => {
    const professorData = new professorDB({
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        user_id: req.body.user_id,
        college_id: req.body.college_id,
        courses: req.body.courses,
        department: req.body.department,
        review_count: 0,
    });

    await professorData
        .save()
        .then(async(doc) => {
            await collegeDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.body.college_id) }, { $inc: { prof_count: 1 } });
            res.status(201).send(doc);
        })
        .catch((err) => {
            res.status(400).send({
                message: "Professor not added successfully",
            });
        });
});

router.get("/:id", async(req, res) => {

    const error = {
        message: "Error in retrieving Professor",
        error: "Bad request",
    };

    let professor;
    await professorDB.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }).then((p) => {
        professor = p;
    }).catch((err) => {
        res.status(400).send(err);
    })

    if (req.query.prof_only && req.query.prof_only === "true") {
        // Needs Professor only, no reviews needed
        res.status(200).send(professor);
    } else {
        // Fetching REVIEWS 
        const options = {
            page: req.query.page || 1,
            limit: 10,
        };

        await reviewDB.paginate({ professor_id: req.params.id }, options)
            .then((paginated_reviews) => {
                res.status(200).send({
                    ...paginated_reviews,
                    professor: professor
                });
            })
            .catch((e) => {
                console.log("Error: ", e);
                res.status(400).send(error);
            });
    }

});

module.exports = router;