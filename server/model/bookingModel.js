const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
        show:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"shows"
        },
        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        transactionID : {
            type : String,
            required : true

        },
        seats :{
            type: Array,
            required : true
        }

})

module.exports = mongoose.model("bookings", BookingSchema)