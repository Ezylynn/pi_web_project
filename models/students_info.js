const {pool} = require("../database/database")
const bcrypt = require('bcrypt');

class StudentInfo{
    
    
    constructor(data){
        this.student_id = data.student_id;
        this.full_name = data.full_name;
        this.email = data.email;
        this.class = data.class;
        
        
    }


    async save(){
            const client = await pool.connect();
        try{
            
            await client.query("INSERT INTO students_info VALUES ($1, $2, $3, $4);", [this.student_id, this.full_name, this.email, this.class]);
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
    static async findById(id){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT * FROM students_info WHERE student_id = $1;", [id]);
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
}

module.exports = {StudentInfo}













module.exports = {StudentInfo}