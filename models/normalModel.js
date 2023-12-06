const mongoose = require('mongoose');

const NormalSchema = mongoose.Schema({
    ipaddress: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now,
    }
});

const Normal = mongoose.model('Normal', NormalSchema)

module.exports = Normal;
