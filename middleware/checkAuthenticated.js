const {Student} = require("../models/students_info");
const {TestResult} = require("../models/result")
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

const enhancedCheckRole = (roleToExclude) => (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(403).redirect("/api/v1/sign-in");
    }

    if (req.user.role === roleToExclude) {
        return res.status(403).redirect("/api/v1/sign-in");
    }

    const { userRole } = req.params;
    if (req.user.role !== userRole) {
        return res.status(403).redirect("/api/v1/sign-in");
    }

    next();
};

const ensureUniqueAccount = (...valueToCheck) => async (req, res, next) => {
    try {
        const storedValue = await Student.fetchEssentials();

        // If no stored values, proceed to next middleware
        if (!storedValue) {
            return next();
        }

        // Check for uniqueness of values
        const isUnique = valueToCheck.some(field => {
            return storedValue.some(record => req.body[field] === record[field]);
        });

        if (isUnique) {
            console.log("Redirected due to duplicate values");
            return res.redirect("/api/v1/register");
        }

        next();
    } catch (error) {
        // Handle any errors that occur during database fetching
        console.error("Error in ensureUniqueAccount middleware:", error);
        res.status(500).send("Internal Server Error");
    }
};

const checkStatus =  async (req,res,next) => {
    const {role} = req.user;
 
    if (role === "student"){
        let userObject = await TestResult.findByStudentId(req.user.user_id)
        
        if (!userObject){
            next()
        }else{
            res.redirect("/api/v1/student/home")
            
        }   
    }else{
        next()
    }
}

const checkId = (req,res,next) => {
    const {user_id} = req.user;
    const {userId} = req.params;
    if (user_id == userId){
        console.log(user_id)
        console.log(userId)
        console.log("I'm here")
        next()
    }else{
        res.redirect("/api/v1/student/home")
    }
}

module.exports = { checkAuthenticated,checkNotAuthenticated, checkRole, ensureUniqueAccount, enhancedCheckRole, checkStatus, checkId};