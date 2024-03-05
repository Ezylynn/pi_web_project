const { Client } = require('pg');

// Database connection configuration
const client = new Client({
    user: 'ucmdd6kjir19nm',
    host: 'cdgn4ufq38ipd0.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com',
    database: 'dat103ndv56f4k',
    password: 'pc4a341cdc507936e928948fc33890b3791688b0bff625ccef4f333a89e2c4e4b',
    port: 5432,
});

async function migrateDown() {
    try {
        await client.connect();

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
        await client.end();
    }
}

migrateDown();