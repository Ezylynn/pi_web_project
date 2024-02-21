const express = require('express');
const {renderHome} = require("../controllers/homeController")
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")
const homeRouter = express.Router();


homeRouter.get("/:userRole/home", checkAuthenticated, (req,res,next) => {
    if (req.user.role === req.params.userRole){
        next()
    }else{
        res.status(403).redirect("/api/v1/sign-in")
    }
}, renderHome);


module.exports = {homeRouter}