const path = require('path')


function checkIsAdmin(req,res,next){
    if(req.session.user._id === "admin"){
        next()
    }else{
        res.sendFile(path.join(__dirname,"../",'views',"404.html"))
    }
}

module.exports = checkIsAdmin;