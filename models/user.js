const {pool} = require("../database/database")
const bcrypt = require('bcrypt');

class User{
    #password;
    
    constructor(data){
        this.user_id = data.user_id || null;
        this.username = data.username;
        this.#password = data.password;
        this.role = data.role;
        this.password_hash = data.password_hash || null;
        
    }

  
    

    async save(){
            const client = await pool.connect();
        try{
            this.hashed_password = await bcrypt.hash(this.#password, 10);
            await client.query("INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3);", [this.username, this.hashed_password, this.role]);
        }catch(err){
            
            throw err;
        }finally{
            if (client){
                client.release();
            }
        }
    }

    async delete(){
        const client = await pool.connect();
        try{
            
            await client.query("DELETE FROM users WHERE user_id = $1;", [this.user_id]);
        }catch(err){
            
            throw err;
        }finally{
            if (client){
                client.release();
            }
        }
    }
    

    async verifyPassword(candidatePassword) {
        if (!this.password_hash) {
            throw new Error('No hashed password available for comparison.');
        }
        return bcrypt.compare(candidatePassword, this.password_hash);
    }
    
    



    static async findByUsername(username){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT * FROM users WHERE username = $1;", [username]);
            if (userInfo.rows.length > 0){
                return new User(userInfo.rows[0]);
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
            const userInfo = await client.query("SELECT * FROM users WHERE user_id = $1;", [id]);
            if (userInfo.rows.length > 0){
                return new User(userInfo.rows[0]);
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

User.findByUsername("xi").then(userObj => {
    console.log(userObj)
})
.catch(err => console.error("Error:", err))










module.exports = {User}
