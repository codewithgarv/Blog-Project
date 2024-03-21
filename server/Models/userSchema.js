const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
        trim:true,
    }

});

const user = mongoose.model('user',userSchema);

module.exports = {user}

