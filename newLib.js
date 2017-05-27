let fs = require('fs'), PDFParser = require("pdf2json");

    let pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        console.log("pdfData: "+pdfParser.getRawTextContent());
        console.log("boh"+pdfParser.getAllFieldsTypes());
    });
 pdfParser.loadPDF("./ciao.pdf");
 
 
 var path = require('path')
var filePath = path.join(__dirname, './ciao.pdf')
var extract = require('pdf-text-extract')
extract(filePath, function (err, pages) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir(pages)
})
 
