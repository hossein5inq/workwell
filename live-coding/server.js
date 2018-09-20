const express = require('express');
const request = require('request');
const crypto = require('crypto');
const ip = require('ip');

const app = express();

app.use('/distribution', express.static(__dirname + '/distribution'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/layouts/index.html');
});

app.get('/page_1', function (req, res) {
    res.sendFile(__dirname + '/layouts/page1.html');
});

app.get('/page_2', function (req, res) {
    res.sendFile(__dirname + '/layouts/page2.html');
});

app.listen(8080, function () {
    console.log(`Your server\'s url is: http://${ip.address()}:8080, `)
});