const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const url = "mongodb+srv://dbUser:dbUserPassword@cluster0.o41cj.mongodb.net/Scaler?retryWrites=true&w=majority&appName=Cluster0";
const dburl = "mongodb+srv://dbUser:dbUserPassword@cluster0.o41cj.mongodb.net/Scaler?retryWrites=true&w=majority&appName=Cluster0";
const usersRouter = require('./routes/userRoutes')
const movieRouter = require('./routes/movieRoute')
const TheatreRouter = require('./routes/theatreRoutes')
const ShowRouter = require('./routes/showRoutes')
const BookingRouter = require('./routes/bookingRoute')

mongoose.connect(dburl).then((c)=>{
    console.log("Yes its connect to db");
}).catch(err => console.log(err));


app.use('/api/users', usersRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theaters', TheatreRouter);
app.use('/api/shows', ShowRouter);
app.use('/api/booking',BookingRouter)

app.listen(8081, () => {
    console.log("Server running on port 8081");
  });

//https://cloud.mongodb.com/v2/6740d5ec5d1d2a00b349241e#/metrics/replicaSet/6740d7f740f9da72b3070145/explorer/Scaler/courses/find