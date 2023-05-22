const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const professorSchema = new mongoose.Schema({
    fname: String,
    mname: String,
    lname: String,
    department: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    college_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },
    courses: [{ type: String }],
    review_count: Number,
}, {
    timestamps: true
});

professorSchema.plugin(paginate);

module.exports = mongoose.model('Professor', professorSchema);