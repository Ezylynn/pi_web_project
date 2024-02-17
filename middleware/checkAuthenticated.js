
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/api/v1/sign-in'); 
    }
}

const checkNotAuthenticated = (req,res,next) => {
    
    if (!req.isAuthenticated()) {
        
        next();
    } else {
        res.redirect(`/api/v1/${req.user.role}/home`); 
    }
}




const checkRole = (req,res,next) => {
    if (req.user.role === req.params.userRole){
        next()
    }else{
        res.status(403).redirect("/api/v1/sign-in")
    }
}

module.exports = { checkAuthenticated,checkNotAuthenticated, checkRole  };