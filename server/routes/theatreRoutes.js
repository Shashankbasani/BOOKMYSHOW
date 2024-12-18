const router = require('express').Router();
const Theatre = require('../model/theatreModel');

router.post('/add-theatre', async(req, res)=>{
  try{  
    const newtTheatre = new Theatre(req.body);
     await newtTheatre.save();
     res.send({
            success:true,
            message: "Theater added Successfully"
        })
    }catch(err){
        res.send({
            success:false,
            message: err.message,
        })
    }
})

router.get('/get-all-theaters', async(req, res)=>{
    try{
    const allTheaters = await Theatre.find();
    res.send({
        success:true,
        data: allTheaters,
        message: "all theaters",
    })
    }catch(err){
        res.send({
            success:false,
            message: err.message,
        })
    }
})

router.delete('/delete-theater', async(req, res)=>{
    try {
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success:true,
            message: "Theater Deleted",
        })
    } catch (error) {
        res.send({
            success:false,
            message: error.message,
        })
    }
   
})

router.put('/update-theater', async(req, res)=>{
    try {
        await Theatre.findByIdAndDelete(req.body.theatreId, req.body);
        res.send({
            success:true,
            message: "Theater Updated",
        })
    } catch (error) {
        res.send({
            success:false,
            message: error.message,
        })
    }
   
})

router.get('/get-all-theaters-by-owner', async(req, res)=>{
    try{
    const allTheaters = await Theatre.find({owner:req.body.owner}).populate('owner');
    res.send({
        success:true,
        data: allTheaters,
        message: "all theaters",
    })
    }catch(err){
        res.send({
            success:false,
            message: err.message,
        })
    }
})


module.exports = router;