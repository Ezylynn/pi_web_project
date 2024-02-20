const renderInstruction = (req,res) => {
    const {user_id} = req.user;
    const {userRole} = req.params;
    res.render("instruction", {userRole, user: req.user, user_id})
}

module.exports = {renderInstruction}