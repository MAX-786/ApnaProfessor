const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

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

reviewSchema.plugin(paginate);

module.exports = mongoose.model('Review', reviewSchema);