const renderHome = (req,res) => {
    
    const {userRole} = req.params;
    res.render("home", {userRole, user: req.user})
}

module.exports = {renderHome}