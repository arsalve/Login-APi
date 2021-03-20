const uri = "mongodb+srv://Alpha1996:Alpha1996@notepad.marpq.mongodb.net/Users?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const chalk = require('chalk');
const ErrorC = chalk.red.inverse;
const Employee = require('./Employee.js');
const User = require('./user.js');
const util = require('./util.js');
const catchHandler = util.catchHandler;
const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const bcrypt = require('bcrypt');
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
async function FindEmp(req, cb) {
    var re = 0;
    var query = {
        'Email': req.body.Email
    };
    try {
        var result = await Employee.find(query).exec();
        if (query.Email != undefined && result.length > 0)
            return cb(result, 200);
        else
            return cb("object not Found", 404);
    } catch (err) {
        catchHandler("While Finding data in the DB", err, ErrorC);
        return cb("Error", 500)
    }
}
async function FindUser(req, cb) {
    if (Authorizer(req.Token, req.creatorEmail)) {
        var re = 0;
        var query = {
            'Email': req.body.Email
        };
        try {
            var result = await User.find(query).exec();
            // console.log(result);
            if (query.Email != undefined && result.length > 0)
                return cb(result, 200);
            else
                return cb("object not Found", 404);
        } catch (err) {
            catchHandler("While Finding data in the DB", err, ErrorC);
            return cb("Error", 500)
        }
    } else {
        return cb("Authentication failed ", 403)
    }
}
async function EmpData(req, cb) {
    try {
        if (emailRegexp.test(req.body.Email)) {
            var query = {
                'Email': req.body.Email
            }
            var password = bcrypt.hashSync((req.body.password).toString(), 8)
            var obj = req.body;
            obj.password = password;
            var resp = await Employee.findOneAndUpdate(query, obj, {
                new: true,
                upsert: true, // Make this update into an upsert
                rawResult: true

            }).then(() => {
                FindEmp(req, cb);
            });
        } else {
            cb("Invalid Email", 200)
        }
    } catch (err) {
        console.log(err);
        catchHandler("While conecting the DB", err, ErrorC);
        return err;

    }


}
async function ELogin(req, cb) {
    var query = {
        'Email': req.body.Email
    }
    var resp, tokenized;
    try {
        var result = await Employee.find(query).exec();
        // console.log(result);
        if (result.length > 0 && await bcrypt.compareSync((req.body.password).toString(), result[0].password) && (result[0].Email === query.Email)) {
            tokenized = {
                "Email": result[0].Email,
                "Token": tokgen.generate(),
                "tokenCreatedAT": Date.now()
            };
            resp = await Employee.findOneAndUpdate(query, tokenized, {
                new: true,
                upsert: true, // Make this update into an upsert
                rawResult: true

            }).then(() => {
                return cb(tokenized, 200);
            });
        } else
            return cb("object not Found", 404);
    } catch (err) {
        catchHandler("While Finding data in the DB", err, ErrorC);
        return cb("Error", 500)
    }
}
async function userData(req, cb) {
    try {
        if (await Authorizer(req.body.Token, req.body.createdBy)) {
            if (emailRegexp.test(req.body.Email)) {
                var query = {
                    'Email': req.body.Email
                }
                var obj = req.body;
                var resp = await User.findOneAndUpdate(query, obj, {
                    new: true,
                    upsert: true, // Make this update into an upsert
                    rawResult: true

                }).then(() => {
                    FindUser(req, cb);
                });
            } else {
                cb("Invalid Email", 200)
            }
        } else {
            return cb("Authentication failed ", 403)
        }
    } catch {
        (err) => {
            catchHandler("While conecting the DB", err, ErrorC);
            return err;
        }
    }


}
async function Authorizer(Token, Email, password) {
    var query = {
        "Token": Token
    };
    try {
        var result = await Employee.find(query).exec();
        if (result.length > 0 && result[0].Email == Email && (result[0].tokenCreatedAT < (result[0].tokenCreatedAT + 1800))) //setting Validity of token is to mins
            return true

        else
            return false;
    } catch (err) {
        catchHandler("Issue while authorizing", err, ErrorC);
    }

}
module.exports = {
    'FindEmp': FindEmp,
    'EmpData': EmpData,
    'ELogin': ELogin,
    'userData': userData,
    'FindUser': FindUser

}