const { use } = require("passport");
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

    
    static async fetchAllIds(){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT student_id FROM test_results;");
            if (userInfo.rows.length > 0){
                let result = []
                userInfo.rows.forEach(element => {
                    result.push(element.student_id)
                })
                return result;
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

    static async update(student_id, data){
        const client  = await pool.connect();
        try{
            await client.query("BEGIN")
            const dataKeys = Object.keys(data);
            const columnToCompare = {
                users: ["username", "role"],
                students_info: ["full_name", "email", "grade"],
                test_results: ["answer", "status", "attempt_time", "attempted_at"]
            }
            let columnToUpdate = {
                users: [],
                students_info: [],
                test_results: []
            }
            let rowToUpdate = {
                users: [],
                students_info: [],
                test_results: []
            }
            dataKeys.forEach(key => {
                if (columnToCompare.users.includes(key)){
                    columnToUpdate.users.push(key)
                    rowToUpdate.users.push(data[key])
                }else if (columnToCompare.students_info.includes(key)){
                    columnToUpdate.students_info.push(key)
                    rowToUpdate.students_info.push(data[key])
                }else if (columnToCompare.test_results.includes(key)){
                    columnToUpdate.test_results.push(key)
                    rowToUpdate.test_results.push(data[key])
                }
            })
            
            if (columnToUpdate.users.length !== 0){
                const setUserClause = columnToUpdate.users.map((key, index) => `${key} = $${index+1}`).join(', ');
                const updateUserQuery = `UPDATE users SET ${setUserClause} WHERE user_id = ${student_id} RETURNING *;`;
                await client.query(updateUserQuery, [...rowToUpdate.users]);
                
            }
            if (columnToUpdate.students_info.length !== 0){
                const setUserClause = columnToUpdate.students_info.map((key, index) => `${key} = $${index+1}`).join(', ');
                const updateUserQuery = `UPDATE students_info SET ${setUserClause} WHERE student_id = ${student_id} RETURNING *;`;
                await client.query(updateUserQuery, [...rowToUpdate.students_info]);
                
            }
            if (columnToUpdate.test_results.length !== 0){
                const setUserClause = columnToUpdate.test_results.map((key, index) => `${key} = $${index+1}`).join(', ');
                const updateUserQuery = `UPDATE test_results SET ${setUserClause} WHERE student_id = ${student_id} RETURNING *;`;
                await client.query(updateUserQuery, [...rowToUpdate.test_results]);
                
            }

            await client.query("COMMIT")
            
            
            
            
            
        }catch(err){
            console.error("Error:", err)
        }finally{
            if (client){
                await client.query("ROLLBACK")
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
// TestResult.fetchAllIds().then(result => console.log(result))





module.exports = {TestResult}