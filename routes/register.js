const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:27017"
const client = new MongoClient(url);

router.get('/', (req, res)=>{
    res.render( 'register',
        {
            title: 'Register page'
        }
    )
})

router.post('/' , (req, res) => {
    console.log(req.body);
    
    const userDoc = req.body
    
    if(userDoc.password === userDoc.Repassword){

        saveData()
        async function saveData() {

          client.connect()
         .then(()=> console.log('connected to mongodb'))
         .catch( (err) => console.log(err))

         const dataBase = client.db('MyUsers')
         const users = dataBase.collection('users')

            const hash = await bcrypt.hash(userDoc.password,10)

           const doc = {
             _id: userDoc._id,
             password: hash
         }

         users.insertOne(doc)
         .then(()=> console.log('inserted successfully'))
         .catch((err) =>{

            if (err.code === 11000) {
                res.send('the username all ready exists')
            } 
        })

        
         res.render('dashboard',{
         title:'dashboard',
         username:userDoc._id
         })    

            
        }

       
    }
    else{

       res.send('<h1> please enter two currect passwords </h1>')
    }


})


module.exports = router