const renderSuperAdminLogin = (req,res) => {
    
    res.render("superAdminLogin")
}

// const superAdminLogOut = (req,res,next) => {
//     console.log("I was reached")
//     req.logout(function(err){
//         if(err){next(err)}
//     })
//     res.redirect("/api/v1/superadmin/login")
// }


module.exports = {renderSuperAdminLogin}