const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('College', collegeSchema);