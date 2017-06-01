var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
var path = require('path');
var cfenv = require('cfenv');
var StatsD = require('node-dogstatsd').StatsD;
var dogstatsd = new StatsD('example.org',8125);


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


var options = {
  host: 'pdfconverterservice-openshiftproxy11.7e14.starter-us-west-2.openshiftapps.com'
};

callback = function(response,writer,tempi) {
    tempi.tempoServizio2 = Date.now();
      var str = '';
  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function (c) {
    writer.send(str);
    writer.end();
    tempi.tempoOverheadMid2=Date.now();
    dogstatsd.timing("adapter_PaaS_overhead.time", tempi.tempoOverheadMid2-tempi.tempoOverheadMid1);
    dogstatsd.timing("adapter_Service_call.time", tempi.tempoServizio2-tempi.tempoServizio1);
//     fs.appendFile(__dirname +'/log.txt', tempi+"\n", function (err) {
//         console.log(err);
//             });
  });
}//callback

function convert(writer,tempi)
{
    tempi.tempoServizio1 = Date.now();
    http.request(options, (response)=>callback(response,writer,tempi)).end();
}

app.get('/pdftotext', function (request, response) {
    dogstatsd.increment('page.views');
    var tempi={
         tempoOverheadMid1:0,
         tempoOverheadMid2:0,
         tempoServizio1:0,
         tempoServizio2:0,
         toString:function() {return "tempiOverheadMidlleware: "+this.tempoOverheadMid1+" "+ this.tempoOverheadMid2+" tempiServizio: "+this.tempoServizio1+" "+this.tempoServizio2;}
    }
    tempi.tempoOverheadMid1= Date.now()
    response.status(200);
    convert(response,tempi);
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
