const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    role: String,
    uid: String,
    photo: String,
    profs_reviewed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professor",
    }],
    reviews_voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);