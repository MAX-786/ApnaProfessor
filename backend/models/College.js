const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const collegeSchema = new mongoose.Schema({
    name: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
});

collegeSchema.plugin(paginate);

module.exports = mongoose.model('College', collegeSchema);