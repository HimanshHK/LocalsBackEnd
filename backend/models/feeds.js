const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    id :{
        type: String,
        required: true,

    },
    mail:{
        type: String,
        required: true,
    },
    msg:{
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('Feeds', feedSchema);