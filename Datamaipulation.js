const uri = "mongodb+srv://Alpha1996:Alpha1996@notepad.marpq.mongodb.net/Users?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const chalk = require('chalk');
const ErrorC = chalk.red.inverse;
const Warning = chalk.yellowBright;
const suc = chalk.greenBright;
const good = chalk.cyanBright;
const Employee = require('./Employee.js');
const User = require('./user.js');
const util = require('./util.js');
const catchHandler = util.catchHandler;
const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58



mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
async function FindObj(req, cb) {
    var re = 0
    var query = req.body;
    try {
        var result = await Employee.find(query).exec();
        // console.log(result);
        if (query.Email!=undefined&&result.length > 0)
            return cb(result,200);
        else
            return cb("object not Found",404);
    } catch (err) {
        catchHandler("While Finding data in the DB", err, ErrorC);
        return cb("Error",500)
    }
}
async function Updatrdata(req, resp) {
    try {
    
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if(emailRegexp.test(req.body.Email)){
        var query = {
            'Email': req.body.Email
        }
        var obj = req.body;
        var resp = await Employee.findOneAndUpdate(query, obj, {
            new: true,
            upsert: true, // Make this update into an upsert
            rawResult: true

        }).then(() => {
            FindObj(req, resp);
        });
    }
    else{
        resp("Invalid Email",200)
    }
    } catch {
        (err) => {
            catchHandler("While conecting the DB", err, ErrorC);
            return err;
        }
    }


}
async function ELogin(req, cb) {
    var re = 0
    var query = req.body;
    var resp ,tokenized;
    try {
        var result = await Employee.find(query).exec();
        // console.log(result);
        if (result.length > 0&(result[0].Email===query.Email)){
         tokenized={"Email":result[0].Email,"Token":tokgen.generate(),"tokenCreatedAT":Date.now()};
          resp = await Employee.findOneAndUpdate(query, tokenized, {
            new: true,
            upsert: true, // Make this update into an upsert
            rawResult: true

        }).then(() => {
            return cb(tokenized,200);
        });
    }
        else
            return cb("object not Found",404);
    } catch (err) {
        catchHandler("While Finding data in the DB", err, ErrorC);
        return cb("Error",500)
    }
}
module.exports = {
    'FindObj': FindObj,
    'Updatrdata': Updatrdata,
    'ELogin': ELogin
}