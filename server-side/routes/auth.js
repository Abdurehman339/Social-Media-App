const express=require('express')
const router=express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs');

//create user
router.post('/register',async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        
        try {
            await user.save()
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
});

//login
router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
         return res.status(404).json('user not found')
        }    
        const comparepassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparepassword){
            return res.status(404).json('user not found')
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }

});

module.exports=router;