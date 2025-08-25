const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt')

const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:27017"
const client = new MongoClient(url);

 const dataBase = client.db('MyUsers')  //database
 const users = dataBase.collection('users') // collection

 


router.get('/', (req, res)=>{
    res.render( 'login',
        {
            title: 'login page',
            
        }
    )
    
})

router.post('/', async (req,res) =>{

    userData =  req.body;
    console.log(userData);


     
    
    client.connect()
    .then(()=> console.log('connected to db'))
    .catch((err) => console.error(err))
     
    
    const user = await users.findOne({_id:userData._id})
    console.log(user);

    const currectUser = await bcrypt.compare(userData.password,user.password)

    if (currectUser){

        req.session.user = {
          
            _id:userData._id,
            password:user.password,

        }
        
        res.render('dashboard',{
            title:"dashboard",
            username:user._id
        })

    } else {
        res.send('your password or username where in correct')
    }
    

    

})


module.exports = router