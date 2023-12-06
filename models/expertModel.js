const mongoose = require('mongoose');

const ExpertSchema = mongoose.Schema({
    ipaddress: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now,
    }
});

const Expert = mongoose.model('Expert', ExpertSchema)

module.exports = Expert;