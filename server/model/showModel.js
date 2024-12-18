const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    date :{
        type:Date,
        required:true,
        set: (value) => {
            const date = new Date(value);
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
          },
    },
    time :{
        type:String,
        required:true
    },
    movie :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'movies',
        required:true,
    },
    ticketPrice :{
        type:Number,
        required:true
    },
    totalSeats :{
        type:Number,
        required:true
    },
    bookedSeats :{
        type:Array,
        default:[]
    },
    theater :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'theaters',
        required:true,
    },
})

const showModel = mongoose.model("shows",ShowSchema);

module.exports = showModel;