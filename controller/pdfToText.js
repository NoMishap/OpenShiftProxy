var http = require('http');
var options = {
  host:  process.env.SERVICE
};


exports.get= function(req,res)
{
  http.request(options, (response)=>callback(response,res)).end();
};


function callback(response,writer)
{
  var str = '';
  if ( response.statusCode==200)
  {
    response.on('data',chunk =>str += chunk);
    response.on('end', ()=>
        {
        writer.send(str);
    });
  }
  else
  {
    writer.statusCode=response.statusCode;  
  } 
  
 writer.end();
}//callback

function convert(writer)
{
    http.request(options, (response)=>callback(response,writer)).end();
}
