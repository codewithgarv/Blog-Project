const mongoose = require('mongoose');

const token = new mongoose.Schema({
    token:{
        type:String,
        require:true,
    }
});
const token_schema = mongoose.model('token',token);

module.exports = {token_schema};