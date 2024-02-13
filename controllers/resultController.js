const redirectToCheat = (req,res) => {
    res.redirect("/api/v1/result/suspended")
}

const renderCheat = (req,res) => {
    res.render("cheat")
}

module.exports = {redirectToCheat, renderCheat}