const {Student} = require("../../models/students_info")
const {User} = require("../../models/user")


async function saveUser(){
    const newUser = new User({
        username: "student",
        role: "student",
        password: "123456"
    })

    await newUser.save()
    const student_id = await User.findByUsername("student").then(student => student.user_id)
    const newStudent = new Student({
        student_id: student_id,
        full_name: "new student",
        email: "student@gmail.com",
        grade: "11B"
    })

    await newStudent.save()
}

saveUser()