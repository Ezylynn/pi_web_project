const {Teacher} = require("../models/teachers_info")
const {User} = require("../models/user")
const renderAccount = async (req,res) => {
    const {role} = req.user;
    const teacherInfo = await Teacher.fetchEssentials();
    res.render("manageAccount", {userRole: role, teacherInfo, user: req.user})
}

const updateAccount = async (req,res) => {
    
    try{
        const {full_name, email, username, password} = req.body;
        
        const newUser = new User({
            role: "teacher",
            username: username,
            password: password
        })
        await newUser.save();

        const teacherId = await User.findByUsername(username).then(user => user.user_id).catch(err => console.error(err));
        const newTeacher = new Teacher({
            teacher_id: teacherId,
            email: email,
            full_name: full_name,
            
        })
        await newTeacher.save();
        const teacherInfo = await Teacher.fetchEssentials()
        
        res.render("partials/eachAccount", {teacherInfo},  function(err, html) {
            if (err) {
                console.error(err);
                res.status(500).send('Error rendering testing info');
            } else {
                
                
                res.status(200).send(html)
            }
        })
    }catch(err){
        console.error(err)
    }

    
    
}


module.exports = {renderAccount, updateAccount}