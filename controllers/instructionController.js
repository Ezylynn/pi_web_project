const renderInstruction = (req,res) => {
    const {user_id} = req.user;
    const {role} = req.user;
    res.render("instruction", {userRole:role, user: req.user, user_id})
}

module.exports = {renderInstruction}