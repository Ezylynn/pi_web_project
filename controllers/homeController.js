const renderHome = (req,res) => {
    
    const {role} = req.user;
    res.render("home", {userRole: role, user: req.user})
}

module.exports = {renderHome}