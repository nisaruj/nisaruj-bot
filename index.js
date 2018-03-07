const server_port = process.env.PORT || 8080;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const Client = require('@line/bot-sdk').Client;
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const config = {
    channelAccessToken: process.env.CH_ATOKEN ,
    channelSecret: process.env.CH_SECRET
}
const client = new Client(config);

app.use('/webhook',middleware(config));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res) {
    res.send("Wow, It's worked!");
});

app.post('/webhook',function(req, res) {
    const event = req.body.events[0];
    if (event.type === 'message') {
        if (event.message.type === 'text') {
            source = event.message.source;
            client.pushMessage(source.userId,{type: "text", text: "you typed : " + event.message.text});
            console.log(event.message.text);
        }
    }
    //console.log(res.json(req.body.events.message));
});

app.listen(server_port);