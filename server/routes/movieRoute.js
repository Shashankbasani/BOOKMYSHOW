const express = require('express');
const router = express.Router();
const Movie = require('../model/MovieModel');


/*
add a movie
get all movies
update a movie
delete a movie
fetch a movie by using there Id
*/

router.post('/add-movie', async(req, res)=>{
   try{ 
    const NewMovie = new Movie(req.body);
    await NewMovie.save();
    res.send({
        success: true,
        message:"movie added successfully",
        data : NewMovie
    })
    }catch(err){
    res.send({
        success:false,
        message:err.message
    })
    }
})

router.get('/get-all-movies', async(req, res)=>{
    try {
        const allMovies = await Movie.find();
        res.send({
            success: true,
            message: "all movies",
            data: allMovies
        })
    } catch (error) {
        res.send({
            success: false,
            message:error.message,
        })
    }
})

router.put('/update-movie', async(req, res)=>{
    
    try {
        const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        const updatedMovie =  await Movie.findById(req.body.movieId);
        res.send({
            success: true,
            message: "Movie Updated",
            data: updatedMovie,
        })
    } catch (error) {
        res.send({
            success: false,
            message:error.message,
        })
    }
})

router.delete('/delete-movie', async(req, res)=>{
    
    try {
        const Deletemovie = await Movie.findByIdAndDelete(req.body.movieId);
        res.send({
            success: true,
            message: "Movie Deleted",
        })
    } catch (error) {
        res.send({
            success: false,
            message:error.message,
        })
    }
})

router.get('/movie/:id', async(req, res)=>{
    try {
        const SingleMovie = await Movie.findById(req.params.id);
        console.log(SingleMovie)
        res.send({
            success: true,
            message:"Here is the singleMovie",
            data : SingleMovie,
        })
    } catch (error) {

        res.send({
            success: false,
            message:error.message,
        })
        
    }
})

module.exports= router;