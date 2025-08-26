const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const checkIsAdmin = require('../middleware/adminAuthentication');

const url = "mongodb://localhost:27017/MyUsers"

const schema = new mongoose.Schema({
    _id:String,
    password:String,
    active:String
})

const users = mongoose.model('users',schema)


router.get('/',checkIsAdmin, async(req,res) => {

    await mongoose.connect(url)
    const data = await users.find()
    res.render('usersTable',{
      users: data
    })

})


router.get('/:id',checkIsAdmin,async (req,res) => {

    const username = req.params.id;
    const data = await users.findOne({_id:username})
    res.render('userTable',{
      user: data
    })

})


router.get('/:id/:active',checkIsAdmin,async (req,res) =>{

    await mongoose.connect(url)
    console.log('connected to db');
    

    const username = req.params.id ;
    const active = req.params.active;

    console.log(typeof username);
    

    if(active === 'disable'){
        await users.updateOne({_id:username} , {$set:{active:false}})
              res.send('<h1>changed sucessfully<h1/>');
    }
    else if(active === 'enable'){


        await users.findOneAndUpdate(
        {_id:username},
        {$set:{active:true}},
        { new: true }  )

              res.send('<h1>changed sucessfully<h1/>');
              
    }
    else{
       res.send('<h1>please enter the currect value<h1/>');
    }

})






module.exports = router