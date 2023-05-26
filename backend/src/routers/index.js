const path = require("path");
process.chdir(path.join(__dirname, "/.."));

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to ApnaProfessor API!");
});

const reviewRouter = require('./Review');
const professorRouter = require('./Professor');
const collegeRouter = require('./College');
const userRouter = require('./User');

// const { auth } = require('../firebase');

// Middleware function to check api call is happened from allowed origin
const checkReferrer = (req, res, next) => {
    const allowedOrigins = ['http://localhost:5173', 'https://website.com'];
    const origin = req.headers.origin;

    const n = allowedOrigins.length;
    for (let i = 0; i < n; i++) {
        if (origin.includes(allowedOrigins[i])) {
            next();
        } else {
            res.status(403).send('Access Forbidden : Wrong origin');
        }
    }
};

// Middleware function to verify Firebase authenticated users
// function authenticateUser(req, res, next) {
//     const authToken = req.headers.authorization;
//     if (!authToken) {
//         return res.status(401).json({ message: 'Unauthorized access' });
//     }
//     auth().verifyIdToken(authToken)
//         .then((decodedToken) => {
//             req.user = decodedToken;
//             next();
//         })
//         .catch((error) => {
//             console.error(error);
//             return res.status(401).json({ message: 'Unauthorized access' });
//         });
// }


router.use('/review', reviewRouter);
router.use('/professor', professorRouter);
router.use('/college', collegeRouter);
router.use('/user', userRouter);

module.exports = router;