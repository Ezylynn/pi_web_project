const redirectToCheat = (req,res) => {
    const {status} = req.params;
    
    res.redirect(`/api/v1/student/result/${status}`)
    
}

const renderResult = (req,res) => {
    const {status} = req.params;
    res.render("result", {status, user: req.user})
}


module.exports = {redirectToCheat, renderResult}