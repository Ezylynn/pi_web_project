const {User} = require("../../models/user")

const {Teacher} = require("../../models/teachers_info")


async function saveAdmin(){
    const newUser = new User({
        username: "teacher",
        role: "teacher",
        password: "123456"
    })

    await newUser.save()
    const teacher_id = await User.findByUsername("teacher").then(teacher => teacher.user_id)

    const newTeacher = new Teacher({
        teacher_id: teacher_id,
        full_name: "new teacher",
        email: "teacher@gmail.com",
        
    })


    await newTeacher.save()
}

saveAdmin()
