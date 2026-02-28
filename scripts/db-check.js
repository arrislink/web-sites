// require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function check() {
    console.log('Connecting to DB:', process.env.DB_HOST);
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        console.log('Connected successfully!');

        // Check tables
        const [tables] = await connection.execute('SHOW TABLES');
        console.log('Tables:', tables.map(t => Object.values(t)[0]));

        // Check columns in contact_submissions
        try {
            const [columns] = await connection.execute('DESCRIBE contact_submissions');
            console.log('contact_submissions columns:', columns.map(c => c.Field));

            if (!columns.find(c => c.Field === 'region')) {
                console.log('MISSING region column! Running migration...');
                // Run region migration
                const sql = fs.readFileSync(path.join(__dirname, '../migrations/add_region_to_contact.sql'), 'utf8');
                await connection.execute(sql);
                console.log('Region column added.');
            }
        } catch (e) {
            console.log('contact_submissions table missing! Running init...');
            const sql = fs.readFileSync(path.join(__dirname, '../migrations/init.sql'), 'utf8');
            await connection.execute(sql);
            console.log('Table created.');

            // Add region column too if init.sql didn't have it (it didn't)
            const sql2 = fs.readFileSync(path.join(__dirname, '../migrations/add_region_to_contact.sql'), 'utf8');
            await connection.execute(sql2);
            console.log('Region column added.');
        }

        // Check users table
        try {
            await connection.execute('DESCRIBE users');
            console.log('users table exists.');
        } catch (e) {
            console.log('users table missing! Running migration...');
            const sql = fs.readFileSync(path.join(__dirname, '../migrations/create_users_table.sql'), 'utf8');
            // Split by ; if multiple queries, but file has one statement usually.
            await connection.execute(sql);
            console.log('Users table created.');
        }

        await connection.end();
    } catch (e) {
        console.error('Connection failed:', e.message);
    }
}

check();
