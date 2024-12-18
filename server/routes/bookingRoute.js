const router = require('express').Router();
const stripe = require('stripe')('sk_test_51QUC35FaIJO3t65N9IO6oRv1jyuSMM5PKCEHJlGgjXKblNj08UKf6ZArKN1pfomsKLnveU7KAlMp7Obel1HzxzVV00pivOcX87');
const Booking = require('../model/bookingModel');
const Show = require('../model/showModel');
const AuthMiddleWare = require('../middleware/authMiddleware');

router.post('/make-payment', async (req, res) => {
    try {
        const { token, amount } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            payment_method_types: ['card'], 
            receipt_email: token.email,
            description: "Token has been assigned to Movie!"
        });

        const transactionID = paymentIntent.id;
        console.log(transactionID);
        res.send({
            success: true,
            message: "Payment Successful",
            data: transactionID
        });
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        });
    }
});

router.post('/book-show', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        
        const show = await Show.findById(req.body.show).populate("movie");
        
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, { bookedSeats: updatedBookedSeats });

        res.send({
            success: true,
            message: "New booking done",
            data: newBooking
        });
    } catch (error) {
        res.send({
            success: false,
            message: error
        });
    }
});

router.get('/get-all-bookings', AuthMiddleWare, async(req, res)=>{
    try {
        console.log(req.body.userID+" heyBookingUser")
        const bookings = await Booking.find({user : req.body.userID})
        .populate("user")
        .populate("show")
        .populate({
            path : "show",
            populate: {
                path : "movie",
                model : "movies"
            }
        })
        .populate({
            path : "show",
            populate : {
                path : "theater",
                model : "theaters"
            }
        })

        res.send({
            success : true,
            message : "Booking Fetched",
            data : bookings
        })
    } catch (error) {
        console.log(error)
        res.send({
            success : false,
            message : error,
        })
    }
})

module.exports = router;
