const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/User");

router.post("/", async(req, res) => {
    // const userData = new userDB({
    //     name: req.body.name,
    //     role: "user",
    //     uid: req.body.uid,
    // });

    const filter = { uid: req.body.uid }
    const update = {
        name: req.body.name,
        role: "user",
        photo: req.body.photo
    }

    await User.findOneAndUpdate(filter, update, { new: true, upsert: true }).then((doc) => {
        res.status(201).send(doc);
    }).catch((err) => {
        res.status(401).send(err);
    });


    // await userData
    //     .save()
    //     .then((doc) => {
    //         res.status(201).send(doc);
    //     })
    //     .catch((err) => {
    //         res.status(400).send({
    //             message: "User not added successfully",
    //         });
    //     });
});


// Middleware function to check user's role or permission level
function checkUserRole(req, res, next) {
    const userId = req.user.uid;
    if (userId === process.env.MY_USER_ID) {
        next();
    }

    User.findOne({ uid: userId }, (err, user) => {
        if (user.role === 'admin') {
            next();
        } else {
            res.status(403).send({
                message: "Access Forbidden : Not Admin",
                data: err,
            });
        }
    });
}

router.post("/:userId", checkUserRole, async(req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, // filter by user ID
            { role: 'admin' }, // update the name property
            { new: true } // return the updated document
        )
        .then((user) => {
            // handle the updated user document
            res.status(201).send(doc);
        })
        .catch((err) => {
            // handle errors
            res.status(400).send({
                message: "User's role NOT updated successfully",
            });
        });
});

module.exports = router;