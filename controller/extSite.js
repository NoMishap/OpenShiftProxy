var http = require('http');
exports.get= function(req,res)
{
  http.request({host:'www.google.it'}, ()=>console.log("fatto")).end();
  res.send('ok')
};
