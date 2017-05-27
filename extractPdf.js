var pdfUtil = require('pdf-to-text');


function convert(write)
{
    var pdf_path = "./ciao.pdf";
    
    pdfUtil.pdfToText(pdf_path, function(err, data) {
    if (err) throw(err);
    write.send(data);
    write.end();
    });
}

exports.convert=convert;
