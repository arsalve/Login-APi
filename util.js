const https = require('https')
//Comon Catch handdling function
const catchHandler = (location, message, color) => {
    var debug =true;
    if (debug == true) {
        if (color == undefined) {
            color = chalk.blueBright;
        }

        console.error(color("error occured when " + location + "\n" + message))
    }
}
const tealiumCollect =(oreq,cb)=>{
    try{
// Make request
let resp,stat;
const data = JSON.stringify(oreq.body)
  const options = {
    hostname: 'collect.tealiumiq.com',
    path: '/event',
    port: 443,
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    }
  }
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    return cb(res,res.statusCode,req)
  })
  req.on('error', error => {
    return cb("Error",400,req)
  })
  req.write(data);
  req.end();
}
catch(er){
    catchHandler("CollectApI Failed",er);
}
}
module.exports = {
    'catchHandler': catchHandler,
    "tealiumCollect":tealiumCollect
};