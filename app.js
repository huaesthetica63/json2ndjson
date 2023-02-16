const fs = require("fs");//file system processing
const JSONStream = require('JSONStream');//reading big json
const stream = require('stream');

async function json2ndjson(filename, resfilename){
  let ws= fs.createWriteStream(resfilename);//create write stream with ndjson
  var fstream = fs.createReadStream(filename),
    parser = JSONStream.parse();//create reading and parse streams
  fstream.pipe(parser);//pipe json parser
  const jsonStringifyStream = JSONStream.stringify();//convert json structure back to simple string
  parser.on('data', function(data){
    //data is json structure, if we convert it again to string, it will be without backspaces and \n
    stream.Readable.from(data).pipe(jsonStringifyStream).pipe(ws);
  })
}

//drive function
function main(){
  json2ndjson("original.json", "nd.json")
}

main()