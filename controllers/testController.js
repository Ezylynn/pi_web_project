
const renderTest = (req,res) => {
    const {userRole} = req.params;
    res.render("test", {userRole, user: req.user})
}


module.exports = {renderTest}