
const renderTest = (req,res) => {
    const {userRole} = req.params;
    const {user_id} = req.user
    res.render("test", {userRole, user: req.user, user_id})
}


module.exports = {renderTest}