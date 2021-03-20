const mongoose = require('mongoose');

const schema = mongoose.Schema({
    'Eid': {
        type: String
    },
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
    'fullName': {
        type: String,
        default: function(){return this.firstName+" "+this.lastName}
    },
},
    {
        timestamps: true
    }
)
const notes = mongoose.model('User', schema)

module.exports = notes;