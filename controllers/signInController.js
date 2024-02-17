const renderSignIn = (req,res) => {
    
    res.render("signIn")
}

const logOut = (req,res,next) => {
    req.logout(function(err){
        if(err){next(err)}
    })
    res.redirect("/api/v1/sign-in")
}


module.exports = {renderSignIn, logOut}