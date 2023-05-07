const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    name: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    college_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },
    courses: [{ type: String }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Professor', professorSchema);