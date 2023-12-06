const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    ipaddress: {
        type: String,
        required: true
    },
    time: {
        type:Date,
        default: Date.now
    }
});

const Client = mongoose.model('Client', ClientSchema)

module.exports = Client;
