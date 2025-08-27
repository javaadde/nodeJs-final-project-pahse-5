const express = require('express');
const app = express();
const MongoStore = require('connect-mongo')
const session = require('express-session')
const loginRout = require('./routes/login')
const registerRout = require('./routes/register')
const usersRout = require('./routes/users')
const path = require('path');
const { title } = require('process');




// view engine_________________
app.set('view engine', 'ejs');




app.use(express.json());
app.use(express.urlencoded( {extended: true}))

app.use(session({
    secret:'javad',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false
    },
    store: MongoStore.create({ 
    mongoUrl: 'mongodb://localhost:27017/MyUsers', 
    collectionName: 'sessions' // optional, default is 'sessions'
  }),

}));


const PORT = process.env.PORT || 5000;

// commen

app.get('/',(req,res) => {

    if(req.session.user){

    res.render('dashboard',{
      title:'user',
      username:req.session.user._id
    })

    }else{
        res.render(
            'login',{
                title:'login'
            }
        )
    }

})

//  userDetails
app.get('/details',(req,res) =>{
    res.render(
        'userDetails',{
            title:'details',
            username: req.session.user._id,
            active: req.session.user.active,
        }
    ) 
})



// login route
app.use('/login', loginRout )

// register route
app.use('/register',registerRout )

// users route
app.use('/users', usersRout)



// 404
app.use((req,res) =>{
   res.sendFile(path.join(__dirname,'views','404.html')); 
})

app.listen( PORT , ()=>{
    console.log("app listening on port:",PORT);
})