const mongoose = require('mongoose');

const TheatreSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    phone:{
        type:Number,
        required: true,
    },
    owner:{
        type:String,
        required: true,
    },
    isActive:{
        type:Boolean,
        default: false,
    },
    
})

const theaterModel = mongoose.model("theaters", TheatreSchema)

module.exports = theaterModel;