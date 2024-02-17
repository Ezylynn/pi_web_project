const { pool } = require("../database/database");
const { encrypt, decrypt, generateKeyAndIV } = require("../utils/encrypt");

class Test {
    #test_code;
    #key;
    #iv;

    constructor(data) {
        this.test_id = data.test_id || null;
        this.test_date = data.test_date;
        this.#test_code = data.test_code || this.generateUniqueTestCode(); 
        this.encrypted_test_code = data.encrypted_test_code || null;
        this.test_name = data.test_name;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
        const keyAndIV = generateKeyAndIV();
        this.#key = keyAndIV.key;
        this.#iv = keyAndIV.iv;
    }

    generateUniqueTestCode() {
        let testCode = '';
        const generatedTestCodes = this.#getAllTestCodes();
        const digits = '0123456789';
        
        do {
            testCode = '';
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * digits.length);
                testCode += digits[randomIndex];
            }
        } while (generatedTestCodes.has(testCode));
    
        generatedTestCodes.add(testCode);
        
        return testCode;
    }

    async #getAllTestCodes() {
        const client = await pool.connect();
        try {
            const decryptedTestCodes = new Set();
            const result = await client.query("SELECT encrypted_test_code FROM pi_tests;");
            result.rows.forEach(testCode => {
                const decryptedCode = decrypt(testCode.encrypted_test_code, this.#key, this.#iv);
                decryptedTestCodes.add(decryptedCode);
            });
            return decryptedTestCodes;
        } catch (err) {
            throw err;
        } finally {
            if (client) {
                client.release();
            }
        }
    }

    async save() {
        const client = await pool.connect();
        try {
            this.encrypted_test_code = encrypt(this.#test_code, this.#key, this.#iv);
            await client.query("INSERT INTO pi_tests (encrypted_test_code, test_date, test_name, start_time, end_time) VALUES ($1, $2, $3, $4, $5);", [this.encrypted_test_code, this.test_date, this.test_name, this.start_time, this.end_time]);
        } catch (err) {
            throw err;
        } finally {
            if (client) {
                client.release();
            }
        }
    }

    async delete(test) {
        const client = await pool.connect();
        try {
            const [key] = Object.keys(test);
            await client.query(`DELETE FROM pi_tests WHERE ${key} = $1;`, [test[key]]);
        } catch (err) {
            throw err;
        } finally {
            if (client) {
                client.release();
            }
        }
    }

    static async find(value) {
        const client = await pool.connect();
        try {
            const [key] = Object.keys(value);
            const result = await client.query(`SELECT * FROM pi_tests WHERE ${key} = $1;`, [value[key]]);
            if (result.rows.length > 0) {
                return new Test(result.rows[0]);
            } else {
                return null;
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            if (client) {
                client.release();
            }
        }
    }
}

module.exports = { Test };








module.exports = {Test}
