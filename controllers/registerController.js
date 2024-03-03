const {User} = require("../models/user");
const {Student} = require("../models/students_info")

const renderRegister = (req,res) => {
    
    res.render("register")
}

const createUser = async (req,res) => {
    try{
        const {fullname, grade, email, username, password} = req.body;
        
        const newUser = new User({
            role: "student",
            username: username,
            password: password
        })
        await newUser.save();

        const studentId = await User.findByUsername(username).then(user => user.user_id).catch(err => console.error(err));
        const newStudent = new Student({
            student_id: studentId,
            email: email,
            full_name: fullname,
            grade: grade
        })
        await newStudent.save();
       
        res.redirect("/api/v1/sign-in")
    }catch(err){
        res.redirect("/api/v1/register")
    }
}

module.exports = {renderRegister, createUser}