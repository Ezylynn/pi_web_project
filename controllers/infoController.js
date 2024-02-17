const renderInfo = (req,res) => {
    const {userRole} = req.params;
    res.render("info", {userRole, user: req.user})
}

module.exports = {renderInfo}