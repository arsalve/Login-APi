//Creating mongoose model for Employee
const mongoose = require('mongoose');
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const mongoosePaginate = require('mongoose-paginate-v2');
const schema = mongoose.Schema({
    'Eid': {
        type: String
    },
    'Email': {
        type: String,
        unique: true,
        validate:{
            validator: emailRegexp.test,
            message: '{VALUE} is not a valid email',
            isAsync: false
          }
    },
    'firstName': {
        type: String
    },
    'lastName': {
        type: String
    },
    'address': {
        type: String
    }, 
    'fullName': {
        type: String,
        default: function(){return this.firstName+" "+this.lastName}
    },
    'Orgnization': {
        type: String,
        default: function(){return this.Email.split('@')[1].split('.com')[0]}
    },
    'isAdmin': {
        type: Boolean,
        default:false
    },
    'password': {
        type: String,
    },
    'Token': {
        type: String,
    },
    'tokenCreatedAT': {
        type: String,
    }
},
    {
        timestamps: true
    }
)
schema.plugin(mongoosePaginate)
const EMP = mongoose.model('Employee', schema);


module.exports = EMP;