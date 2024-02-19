const {pool} = require("../database/database")
const bcrypt = require('bcrypt');


class Student{
    
    
    constructor(data){
        this.student_id = data.student_id;
        this.full_name = data.full_name;
        this.email = data.email;
        this.grade = data.grade;
        
        
    }


    async save(){
            const client = await pool.connect();
        try{
            
            await client.query("INSERT INTO students_info VALUES ($1, $2, $3, $4);", [this.student_id, this.full_name, this.email, this.grade]);
        }catch(err){
            
            throw err;
        }finally{
            if (client){
                client.release();
            }
        }
    }

 
    static async findByName(name){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT * FROM students_info WHERE full_name = $1;", [name]);
            if (userInfo.rows.length > 0){
                return new StudentInfo(userInfo.rows[0]);
            }else{
                return null
            }
        }catch(err){
            console.error("Error:", err)
        }finally{
            if (client){
                client.release();
            }
        }
    }

    static async fetchEssentials(){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT students_info.student_id, users.user_id, users.username, students_info.full_name, students_info.grade, students_info.email, test_results.answer, test_results.status, users.created_at FROM students_info LEFT JOIN users ON users.user_id = students_info.student_id LEFT JOIN test_results ON students_info.student_id = test_results.student_id;");
            if (userInfo.rows.length > 0){
                return userInfo.rows;
            }else{
                return null
            }
        }catch(err){
            console.error("Error:", err)
        }finally{
            if (client){
                client.release();
            }
        }
    }

    static async findByUsername(username){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT students_info.*, users.* FROM students_info INNER JOIN users ON students_info.student_id = users.user_id WHERE username = $1; ", [username]);
            if (userInfo.rows.length > 0){
                return userInfo.rows;
            }else{
                return null
            }
        }catch(err){
            console.error("Error:", err)
        }finally{
            if (client){
                client.release();
            }
        }
    }
    static async findById(id){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT * FROM students_info WHERE student_id = $1;", [id]);
            if (userInfo.rows.length > 0){
                return new Student(userInfo.rows[0]);
            }else{
                return null
            }
        }catch(err){
            console.error("Error:", err)
        }finally{
            if (client){
                client.release();
            }
        }
    }
}




module.exports = {Student}













