const server_port = process.env.PORT || 8080;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mathjs = require('mathjs');
var help = require('./help.json');

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
            getText = event.message.text;
            var output = 'Nothing';
            if (getText.slice(0,4).toLowerCase() === 'calc') {
                output = mathjs.eval(getText.slice(getText.search(' '))).toString();   
            } else if (getText.toLowerCase() === 'help') {
                output = ''
                for (var i=0;i<help.list.length;i++) {
                    output += help.list[i][0] + ' : '+ help.list[i][1] + '\n';
                }
            } else {
                output = "you typed : " + getText + '\n';
                output += "type <help> to get all commands";
            }
            client.pushMessage(event.source.userId,{type: "text", text: output});
            console.log(event.source.userId + ' : ' + getText);
        }
    }
});

app.listen(server_port);