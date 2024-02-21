const {Student} = require("../models/students_info")
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




const checkRole = (role) => (req,res,next) => {
    if (req.user.role === role){
        next()
    }else{
        res.status(403).redirect("/api/v1/sign-in")
    }
}

const ensureUniqueAccount = (...valueToCheck) => async (req,res,next) => {
    const storedValue = await Student.fetchEssentials()
    for (let i = 0; i < valueToCheck.length; i++){
        for (let j = 0; j < storedValue.length; j++){
            if (req.body[valueToCheck[i]] === storedValue[j][valueToCheck[i]]){
                console.log("redirected")
                return res.redirect("/api/v1/register")
            }
        }
    }
    next()
}

module.exports = { checkAuthenticated,checkNotAuthenticated, checkRole, ensureUniqueAccount};