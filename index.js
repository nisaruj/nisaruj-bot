const server_port = process.env.PORT || 8080;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const config = {
    channelAccessToken: process.env.CH_ATOKEN ,
    channelSecret: process.env.CH_SECRET
}

app.use('/webhook',middleware(config));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res) {
    res.send("Wow, It's worked!");
});

app.post('/webhook',function(req, res) {
    console.log(res.json(req.body.events));
});

app.listen(server_port);