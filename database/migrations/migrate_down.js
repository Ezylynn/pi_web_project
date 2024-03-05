const { pool } = require("../database")


// Database connection configuration


async function migrateDown() {
    const client = pool.connect()
    try {
       

        // Migration down logic
        await client.query(`
            DROP TABLE IF EXISTS test_results;
            DROP TABLE IF EXISTS pi_tests;
            DROP TABLE IF EXISTS teachers_info;
            DROP TABLE IF EXISTS students_info;
            DROP TABLE IF EXISTS users;
            DROP TYPE IF EXISTS user_role;
        `);

        console.log('Migration down executed successfully');
    } catch (error) {
        console.error('Error executing migration down:', error);
    } finally {
        await client.release();
    }
}

migrateDown();