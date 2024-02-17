const renderInstruction = (req,res) => {
    const {userRole} = req.params;
    res.render("instruction", {userRole, user: req.user})
}

module.exports = {renderInstruction}