const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware.js')


router.post('/register', async(req, res)=>{

   try{ const UserExits = await userModel.findOne({email:req.body.email});

    if(UserExits){
        res.send({
            success : false,
            message : "User Already Exist"
        })

        return
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    const newUser = await userModel(req.body);
    await newUser.save();

    res.send({
        success: true,
        message:"User Created Successfully"
    })
 }catch(err){
    console.log(err)
    res.send({
        success: false,
        message : err
    })
 }
})

router.post('/login', async(req, res)=>{

   try {
    
      const userExist = await userModel.findOne({email: req.body.email});
      
      if(!userExist){
         res.send({
            success: false,
            message :"User Does Not Exist"
        })
        return
      }

      const validPassword = await bcrypt.compare(req.body.password, userExist.password);

      if(!validPassword){
         res.send({
            success : false,
            message : "Invalid Password"
        })
        return
      }

      const token = jwt.sign({ userID: userExist._id},"scaler_BMS",{
         expiresIn:"1d",
      });

      console.log(token)
      
      res.send({
        success : true,
        message : "Logged in Successfully",
        token : token
      })

   } catch (error) {
        console.log(err);
   }


})

router.get('/get-current-user', auth, async(req, res)=>{
   const user = await userModel.findById(req.body.userID).select("-password");
   res.send({
      success:true,
      message:"You are authorized",
      data: user
   })
})


module.exports = router;