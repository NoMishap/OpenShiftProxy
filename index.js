var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
var path = require('path');
var cfenv = require('cfenv');

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
/*
var time2;
var time1; 
app.get('/pdftotext', function (request, response) {
    
    time1 = Date.now();
        document_conversion.convert({
        file: fs.createReadStream('ciao.pdf'),
        conversion_target: 'ANSWER_UNITS',
        // Use a custom configuration.
        config: config
            }, function (err, responsedoc) {
            if (err) {
                console.error(err);
            } else {
                time2 = Date.now();
                var converted = JSON.stringify(responsedoc, null, 2);
                fs.appendFile(__dirname +'/log.txt', time1+" "+time2+"\n", function (err) {
                    console.log(err);
                        });
                response.status(200); 
                response.send(time1+" "+time2+" "+converted); 
                response.end();
            }
            });
});
*/
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

app.listen(appEnv.port);
console.log("server in esecuzione alla porta"+appEnv.port);
