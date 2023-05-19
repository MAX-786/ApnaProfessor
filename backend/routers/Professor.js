const path = require("path");
process.chdir(path.join(__dirname, "/.."));

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const professorDB = require("../models/Professor");
const reviewDB = require("../models/Review");

router.post("/", async(req, res) => {
    const professorData = new professorDB({
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        user_id: req.body.user_id,
        college_id: req.body.college_id,
        courses: req.body.courses,
        department: req.body.department,
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

router.get("/:id", async(req, res) => {

    const error = {
        message: "Error in retrieving Professors",
        error: "Bad request",
    };

    let professor;
    await professorDB.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }).then((p) => {
        professor = p;
    }).catch((err) => {
        res.status(400).send(err);
    })

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

});

module.exports = router;