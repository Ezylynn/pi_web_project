
const renderTest = (req,res) => {
    const {role} = req.user
    const {user_id} = req.user
    res.render("test", {userRole: role, user: req.user, user_id})
}


module.exports = {renderTest}