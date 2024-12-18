const router = require('express').Router();
const Show = require('../model/showModel');

router.post('/add-show', async(req, res)=>{
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.send({
            success:true,
            message:'new show added',
            data:newShow,
        })
    } catch (error) {
        res.send({
            success:false,
            message:error
        })
    }
})

router.get('/get-all-show-list', async(req, res)=>{
    try {
        const shows = await Show.find();
        res.send({
            success:true,
            message : "all show details fetched",
            data : shows
        })
    } catch (error) {
        res.send({
            success:false,
            message:error
        })
    }
})

// all shows by a theater
router.post('/get-all-show-by-theater', async(req, res)=>{
    try {
        const show = await Show.find({theater:req.body.theaterId}).populate('movie');
        const allShowsByTheater = [];
        show.forEach(show=>{
            let obj ={};
            obj.avaliableShow = show.name;
            obj.time = show.time;
            obj.movie = show.movie.title;
            allShowsByTheater.push(obj);
        })
        res.send({
            success:true,
            message:'show by theater',
            data:allShowsByTheater,
        })
    } catch (error) {
        res.send({
            success:false,
            message:error
        })
    }
})


router.post('/get-all-theater-by-movies', async(req, res)=>{
    try {
        const {movie, date} = req.body;
        const show = await Show.find({movie,date}).populate('theater');
        //format the data
        let uniqueTheaters = [];  // Initialize an empty array to store unique theaters

            show.forEach(sho => {  // Loop through each show in the 'show' array
                let isTheater = uniqueTheaters.find(t => t._id == sho.theater._id);  // Check if the theater is already in the uniqueTheaters array
                if (!isTheater) {  // If the theater isn't found in the uniqueTheaters array
                    let showsOftheTheater = show.filter(shObj => sho.theater._id == shObj.theater._id);  // Find all shows for that theater
                    uniqueTheaters.push({...sho.theater._doc, shows: showsOftheTheater});  // Add the theater and its shows to uniqueTheaters
                }
            });

        /*_doc is a special Mongoose property that gives you the raw document without any of Mongoose's extra methods or properties.
        In your code, it's used to safely get just the plain data of the theater and add the shows array to it. */
         console.log(uniqueTheaters)
        res.send({
            success:true,
            message:'theater by movies',
            data:uniqueTheaters,
        })
    } catch (error) {
        console.log("it error fix it")
        res.send({
            success:false,
            message:error
        })
    }
})


router.put('/update-show', async(req, res)=>{
    try {
         await Show.findByIdAndUpdate(req.body.showId, req.body)
        res.send({
            success:true,
            message:'show Updated',
        })
    } catch (error) {
        res.send({
            success:false,
            message:error
        })
    }
})

router.post('/get-single-show-details', async(req, res)=>{
    try {
        const showDetails = await Show.findById(req.body.showId).populate('theater').populate('movie')
        res.send({
            success:true,
            data:showDetails
        })
    } catch (error) {
        res.send({
            success:false,
            message:error
        })
    }
})

router.delete('/delete-all-shows', async(req, res)=>{
    try {
        await Show.deleteMany({});
        console.log("All shows have been deleted.");
        res.send({
            success:true,
            message : "deleted Successfully"
        })
      } catch (err) {
        console.error("Error deleting shows:", err);
        res.send({
            success:false,
            message : err
        })
      }
})

/*
const deleteAllShows = async () => {
  try {
    await Show.deleteMany({});
    console.log("All shows have been deleted.");
  } catch (err) {
    console.error("Error deleting shows:", err);
  }
};
*/

module.exports = router;