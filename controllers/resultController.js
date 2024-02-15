const redirectToCheat = (req,res) => {
    const {status} = req.params;
    res.redirect(`/api/v1/result/${status}`)
    
}

const renderResult = (req,res) => {
    const {status} = req.params;
    res.render("result", {status})
}


module.exports = {redirectToCheat, renderResult}