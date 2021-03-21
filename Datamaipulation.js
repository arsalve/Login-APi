const uri = process.env.DB ||"mongodb+srv://Alpha1996:Alpha1996@notepad.marpq.mongodb.net/Users?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const chalk = require('chalk');
const TokenGenerator = require('uuid-token-generator');
const Employee = require('./Employee.js');
const User = require('./user.js');
const util = require('./util.js');
const catchHandler = util.catchHandler;
const ErrorC = chalk.red.inverse;
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const bcrypt = require("bcryptjs")

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//following function finds an employee based on given querry
async function FindEmp(req, cb) {
    var query = req.body.query ? req.body.query : {};
    var page = req.body.page ? req.body.page : {
        "pagination": false
    };
    try {
        var result = await Employee.paginate(query, page);

        if (query.Email != undefined && result.docs.length > 0)
            return cb(result, 200);
        else
            return cb("object not Found", 404);
    } catch (err) {
        catchHandler("While Finding data in the DB", err, ErrorC);
        return cb("Error", 500)
    }
}

//following function finds an user based on given querry
async function FindUser(req, cb) {
    var token = req.headers.token;
    if (await Authorizer(token)) {
        var query = req.body.query ? req.body.query : {};
        

        var page = req.body.page ? req.body.page : {
            "pagination": false
        };
        try {
            var result = await User.paginate(query, page);

            // console.log(result);
            if (result.docs.length > 0)
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

//following function creates an employee based on given data
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
                req.body.query =   req.body.query = query;
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

//following function creates an token employees email and password
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

//following function creates an User based on given data
async function userData(req, cb) {
    try {
        var token = req.headers.token;
        if (await Authorizer(token)) {
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
                    req.body.query = query;
                    FindUser(req, cb);
                });
            } else {
                cb("Invalid Email", 200)
            }
        } else {
            return cb("Authentication failed ", 403)
        }
    } catch(err) {
            catchHandler("While conecting the DB", err, ErrorC);
           
            return  cb("Error", 500);
        
    }


}

//following function Validates an employee token provided in headder
async function Authorizer(Token) {
    var query = {
        "Token": Token
    };
    try {
        var result = await Employee.find(query).exec();
        if (result.length > 0 && (result[0].tokenCreatedAT < (result[0].tokenCreatedAT + 1800))&& result[0].isAdmin==true) //setting Validity of token is to mins and checking the user is admin or not
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