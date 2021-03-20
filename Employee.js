const mongoose = require('mongoose');
const validator = require('validator');

const schema = mongoose.Schema({
    'Eid': {
        type: String
    },
    'Email': {
        type: String,
        unique: true,
        validate:{
            validator: validator.isEmail,
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
const notes = mongoose.model('Employee', schema)

module.exports = notes;