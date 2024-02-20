const {pool} = require("../database/database");

const bcrypt = require('bcrypt');

class TestResult{
    constructor(data){
        this.result_id = data.result_id;
        this.student_id = data.student_id;
        this.test_id = data.test_id;
        this.answer = data.answer;
        this.attempt_time = data.attempt_time;
        this.attempted_at = data.attempted_at;
        this.status = data.status;
          
    }


    async save(){
            const client = await pool.connect();
        try{
            
            await client.query("INSERT INTO test_results (student_id, test_id, answer, status, attempt_time) VALUES ($1, $2, $3, $4, $5);", [this.student_id, this.test_id, this.answer, this.status, this.attempt_time]);
        }catch(err){
            
            throw err;
        }finally{
            if (client){
                client.release();
            }
        }
    }

 
    static async findByStudentId(studentId){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT * FROM test_results WHERE student_id = $1;", [studentId]);
            if (userInfo.rows.length > 0){
                return new TestResult(userInfo.rows[0]);
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
    static async findByResultId(resultId){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT * FROM test_results WHERE result_id = $1;", [resultId]);
            if (userInfo.rows.length > 0){
                return new TestResult(userInfo.rows[0]);
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




module.exports = {TestResult}