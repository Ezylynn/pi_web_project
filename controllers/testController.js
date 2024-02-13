const renderTest = (req,res) => {
    res.render("test")
}

const finishTest = (req,res) => {
    const {answer} = req.body;
    res.redirect("/api/v1/home")
}

module.exports = {renderTest, finishTest}