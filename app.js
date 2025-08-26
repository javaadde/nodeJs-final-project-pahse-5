const express = require('express');
const app = express();
const MongoStore = require('connect-mongo')
const session = require('express-session')
const loginRout = require('./routes/login')
const registerRout = require('./routes/register')
const usersRout = require('./routes/users')
const path = require('path');


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

app.get('/',(req,res) => {
    res.render('dashboard',{
      title:'user',
      username:req.session.user._id
    })
})



app.set('view engine', 'ejs');

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