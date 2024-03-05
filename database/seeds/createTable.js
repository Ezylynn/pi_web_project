
const createTable = async () => {
    const {pool} = require("../database")


    const client = await pool.connect()

    await client.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT current_timestamp
    );`)

    await client.release()
}

createTable()