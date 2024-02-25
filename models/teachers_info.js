const {pool} = require("../database/database")
const bcrypt = require('bcrypt');

class Teacher{
    constructor(data){
        this.teacher_id = data.teacher_id;
        this.full_name = data.full_name;
        this.email = data.email;
          
    }


    async save(){
            const client = await pool.connect();
        try{
            
            await client.query("INSERT INTO teachers_info VALUES ($1, $2, $3);", [this.teacher_id, this.full_name, this.email]);
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
            const userInfo = await client.query("SELECT * FROM teachers_info WHERE full_name = $1;", [name]);
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
    static async findById(id){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT * FROM teachers_info WHERE teacher_id = $1;", [id]);
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
            const userInfo = await client.query("SELECT teachers_info.teacher_id, users.user_id, users.role, users.username, teachers_info.full_name,  teachers_info.email,  users.created_at FROM teachers_info FULL JOIN users ON users.user_id = teachers_info.teacher_id WHERE users.role = 'teacher';");
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
}






module.exports = {Teacher}