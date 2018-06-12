var apm = require('elastic-apm-node').start(
  {
    // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: 'OpenshiftProxy',
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: ' http://apmserver:8200',
  });
var express = require('express');
var app = express();
var http = require('http');
var options = {
  host: 'pdfconverterservice-openshiftproxy11.7e14.starter-us-west-2.openshiftapps.com'
};



app.get('/', function (request, response) {
    response.status(200);
    response.send("hi");
    response.end();
    });

app.get('/error', function (request, response) {
    var err = new Error('Ups, something broke!')
    apm.captureError(err)
    response.status(200);
    response.send("y create an error");
    response.end();
    });

function callback(response,writer,tempi) {
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
  });
}//callback

function convert(writer,tempi)
{
    tempi.tempoServizio1 = Date.now();
    http.request(options, (response)=>callback(response,writer,tempi)).end();
}

app.get('/pdftotext', function (request, response) {
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

app.get('/ping', function (request, response) {
    response.status(200);
    response.send("ok");
    response.end();
    });

app.listen("8080");
console.log("server in esecuzione alla porta: 8080");
