const path = require('path')

function checkIsAdmin(req,res,next){

    
    const id = req.session.user._id;
    console.log(typeof id);
    
     
    if(id === 'admin'){
        next();
    }else{
        res.sendFile(path.join(__dirname,"../",'views',"404.html"))
    }
}

module.exports = checkIsAdmin;