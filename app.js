const express = require('express');
const app = express();
const MongoStore = require('connect-mongo')
const session = require('express-session')
const loginRout = require('./routes/login')
const registerRout = require('./routes/register')


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

app.get('/', (req,res) =>{
    res.render( "dashboard",{
        title:'dashboard',
        username:req.session.user._id
    })
})

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

// login route
app.use('/login', loginRout )

// register route
app.use('/register',registerRout )



app.listen( PORT , ()=>{
    console.log("app listening on port:",PORT);
})