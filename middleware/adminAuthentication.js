


function checkIsAdmin(req,res,next){
    if(req.session.user._id === "admin"){
        next()
    }else{
        res.send('<h1>404</h1>')
    }
}

module.exports = checkIsAdmin;