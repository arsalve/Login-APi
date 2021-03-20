const mongoose = require('mongoose');

const schema = mongoose.Schema({
    'Email': {
        type: String,
        unique: true,
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
    }
},
    {
        timestamps: true
    }
)
const notes = mongoose.model('User', schema)

module.exports = notes;