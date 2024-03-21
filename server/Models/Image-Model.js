const mongoose = require('mongoose');

const Image = new mongoose.Schema({
    url:{
        type:String,
    }

});

const Image_model = mongoose.model('Images',Image);

module.exports = {Image_model}