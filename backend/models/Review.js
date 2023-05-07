const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    text: String,
    votes: Number,
    professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professor",
    },
    course: String,
    rating: { type: Number, required: true },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);