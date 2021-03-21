//Creating mongoose model for User
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const schema = mongoose.Schema({
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
    'createdBy': {
        type: String
    }, 
    'fullName': {
        type: String,
        default: function(){return this.firstName+" "+this.lastName}
    },
    'Orgnization': {
        type: String,
        default: function(){return this.Email.split('@')[1].split('.com')[0]}
    }
},
    {
        timestamps: true
    }
)
schema.plugin(mongoosePaginate)
const User = mongoose.model('User', schema)
module.exports = User;