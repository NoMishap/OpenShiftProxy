var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
var path = require('path');
var cfenv = require('cfenv');
//var pdftotext= require('./extractPdf');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


app.get('/', function (request, response) {
    response.status(200);
    response.send("hi");
    response.end();
    });


var time2=0;
var time1=0; 
var options = {
  host: 'pdfconverterservice-openshiftproxy11.7e14.starter-us-west-2.openshiftapps.com'
};

callback = function(response,writer) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function (c) {
    writer.send(str);
    writer.end();
    time2 = Date.now();
    fs.appendFile(__dirname +'/log.txt', time1+" "+time2+"\n", function (err) {
        console.log(err);
            });
  });
}//callback

function convert(writer)
{
    http.request(options, (response)=>callback(response,writer)).end();
}

app.get('/pdftotext', function (request, response) {
    
    response.status(200);
    time1 = Date.now();
    convert(response);
});

app.get('/filelog', function (request, response) {
    response.sendFile(path.join(__dirname +'/log.txt'));
    });

app.get('/eliminafile', function (request, response) {
    fs.unlink(__dirname +'/log.txt');
    response.status(200);
    response.send("eliminato");
    response.end();
    });

app.get('/ping', function (request, response) {
    response.status(200);
    response.send("ok");
    response.end();
    });

app.listen("8080");
console.log("server in esecuzione alla porta: 8080");
