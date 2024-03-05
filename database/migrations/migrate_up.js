const { pool } = require("../database")



async function migrateUp() {
    const client = await pool.connect()
    try {
        

        // Migration up logic
        await client.query(`
            CREATE TYPE user_role AS ENUM ('student', 'teacher', 'superadmin');

            CREATE TABLE users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role user_role NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE students_info (
                student_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
                full_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                grade VARCHAR(50)
            );

            CREATE TABLE teachers_info (
                teacher_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
                full_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL
            );

            CREATE TABLE pi_tests (
                test_id SERIAL PRIMARY KEY,
                encrypted_test_code VARCHAR(50) UNIQUE NOT NULL,
                test_date DATE,
                test_name TEXT,
                start_time TIMESTAMP,
                end_time TIMESTAMP
            );

            CREATE TABLE test_results (
                result_id SERIAL PRIMARY KEY,
                student_id INTEGER NOT NULL REFERENCES users(user_id),
                test_id INTEGER NOT NULL REFERENCES pi_tests(test_id),
                answer TEXT,
                status VARCHAR(10),
                attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Migration up executed successfully');
    } catch (error) {
        console.error('Error executing migration up:', error);
    } finally {
        client.release();
    }
}

migrateUp();