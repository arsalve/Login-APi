//Creating mongoose model for User
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const schema = mongoose.Schema({
  
    'fullName': {
        type: String,
        default: function(){return this.firstName+" "+this.lastName}
    }
},
    {
        timestamps: true
    }
)
schema.plugin(mongoosePaginate)
const user = mongoose.model('User', schema)

module.exports = user;