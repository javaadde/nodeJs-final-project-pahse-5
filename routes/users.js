const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/MyUsers"

const schema = new mongoose.Schema({
    _id:String,
    password:String
})

const users = mongoose.model('users',schema)

// router.get('/', async(req,res) => {

//     if(req.session.user._id === "admin"){

//     await mongoose.connect(url)
//     const data = await users.find()
//     res.json(data)

//     }
//     else{
//         res.send('404')
//     }

   
// })


router.get('/:id',async (req,res) => {

    if(req.session.user._id === "admin"){

    const username = req.params.id;
    const data = await users.findOne({_id:username})

    res.json(data)

    }
    else{
     res.send('404')
    }

})


router.get('/', async(req,res) => {

     if(req.session.user._id === "admin"){
       const query = req.query.name
       const data = await users.findOne({_id:query})
       res.json(data)
     }
     else{
        res.send('404')
     }
})

module.exports = router