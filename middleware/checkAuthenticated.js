
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login'); 
    }
}

function checkNotAuthenticated(req,res,next){
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/home'); 
    }
}


function checkAdmin(req, res, next) {
    
    if (req.user && req.user.role === 'admin') { //req.user is provided by passport.js after authentication
        return next();
    } else {
        res.status(403).send('Forbidden');
    }
}


function checkSuperAdmin(req, res, next) {
    
    if (req.user && req.user.role === 'superadmin') { //req.user is provided by passport.js after authentication
        return next();
    } else {
        res.status(403).send('Forbidden');
    }
}

module.exports = { checkAuthenticated,checkNotAuthenticated, checkAdmin, checkSuperAdmin  };