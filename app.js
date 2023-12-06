const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const { insertExpert, insertNormal, insertClient } = require('./routes/receiveRoute.js');
const articles = require('./routes/articlesRoute.js');
const users = require('./routes/usersRoute.js');
const { router: receives } = require('./routes/receiveRoute.js');
const config = require('./config.js');
const dgram = require('dgram');
const { Console } = require('console');
const net = require('net');


const keyserver = net.createServer((socket) => {
    const clientAddress = socket.remoteAddress;
    const clientPort = socket.remotePort;
    console.log('Client connected.');

    socket.on('data', (data) => {
        console.log('Received:', data.toString(), "    from ", clientAddress);
        insertNormal(data.toString(), clientAddress);
    });

    socket.on('end', () => {
        console.log('Client disconnected.');
    });

    socket.on('error', (err) => {
        console.error(`Client Error: ${err.message}`);
    });
});

keyserver.listen({
    host: '0.0.0.0',
    port: 20173
}, () => {
    console.log('Server listening for connections...');
});

const clipserver = net.createServer((socket) => {
    const clientAddress = socket.remoteAddress;
    const clientPort = socket.remotePort;
    console.log('Client connected.');

    socket.on('data', (data) => {
        console.log('Received:', data.toString());
        insertExpert(data.toString(), clientAddress);
    });

    socket.on('end', () => {
        console.log('Client disconnected.');
    });

    socket.on('error', (err) => {
        console.error(`Client Error: ${err.message}`);
    });
});

clipserver.listen({
    host: '0.0.0.0',
    port: 20174
}, () => {
    console.log('Server listening for connections...');
});

const liveserver = net.createServer((socket) => {
    const clientAddress = socket.remoteAddress;
    const clientPort = socket.remotePort;
    console.log('Client connected.');

    socket.on('data', (data) => {
        console.log('Received:', data.toString());
        insertClient(data.toString(), clientAddress);
    });

    socket.on('end', () => {
        console.log('Client disconnected.');
    });

    socket.on('error', (err) => {
        console.error(`Client Error: ${err.message}`);
    });
});

liveserver.listen({
    host: '0.0.0.0',
    port: 20175
}, () => {
    console.log('Server listening for connections...');
});

const MONGODB_URI = config.mongodburi || 'mongodb://localhost/basic-mern-app';
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/basic-mern-app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
    console.log(error);
});

let app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/api/articles', articles);
app.use('/api/users', users);
app.use('/api/receive', receives);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});
