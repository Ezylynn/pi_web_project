const renderTest = (req,res) => {
    const {userRole} = req.params;
    res.render("test", {userRole, user: req.user})
}

const finishTest = (req,res) => {
   
    
    res.redirect("/api/v1/student/home", {user: req.user})
}

module.exports = {renderTest, finishTest}