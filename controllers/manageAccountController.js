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

// const sortAccount = async (req,res) => {
    
    
//     const {sortType, state} = req.body;
    
//     let userInfo = await Teacher.fetchEssentials();
  
//     console.log(sortType)
//     console.log(state)
    

//     if(state){

//         switch (sortType){
//             case "full_name":
//                 userInfo = userInfo.sort((a, b) => a.full_name.localeCompare(b.full_name));
//                 break;
//             case "email":
//                 userInfo = userInfo.sort((a, b) => a.email.localeCompare(b.email));
                
//                 break;
//             case "username": 
//                 userInfo = userInfo.sort((a, b) => a.username.localeCompare(b.username));
//                 break;
//         }
//     }

    
    
    
    

  
  
//   res.render("partials/accounts", {teacherInfo: userInfo}, function(err, html) {
//     if (err) {
//         console.error(err);
//         res.status(500).send('Error rendering leaderboard');
//     } else {
       
//         // Send back only the rendered HTML fragment for the leaderboard table, not an entire document.
//         res.send(html);
        
//     }
// })

    
// }
module.exports = {renderAccount, updateAccount}