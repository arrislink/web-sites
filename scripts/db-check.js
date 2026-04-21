// require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

function getRequiredEnv(name) {
    const v = process.env[name];
    if (!v) {
        throw new Error(`Missing required env: ${name}`);
    }
    return v;
}

function stripSqlComments(sql) {
    return sql
        .replace(/\/\*[\s\S]*?\*\//g, '\n')
        .replace(/^\s*--.*$/gm, '')
        .replace(/^\s*#.*$/gm, '');
}

function splitSqlStatements(sql) {
    const s = stripSqlComments(sql);
    const out = [];
    let cur = '';
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        const prev = i > 0 ? s[i - 1] : '';

        if (ch === "'" && !inDouble && prev !== '\\') {
            inSingle = !inSingle;
            cur += ch;
            continue;
        }
        if (ch === '"' && !inSingle && prev !== '\\') {
            inDouble = !inDouble;
            cur += ch;
            continue;
        }

        if (ch === ';' && !inSingle && !inDouble) {
            const stmt = cur.trim();
            if (stmt) out.push(stmt);
            cur = '';
            continue;
        }

        cur += ch;
    }

    const tail = cur.trim();
    if (tail) out.push(tail);
    return out;
}

function getMigrationNumber(fileName) {
    const m = fileName.match(/^(\d+)/);
    if (!m) return Number.POSITIVE_INFINITY;
    return Number.parseInt(m[1], 10);
}

function isIgnorableMysqlError(err) {
    const ignorableErrnos = new Set([1050, 1060, 1061, 1091]);
    if (typeof err?.errno === 'number' && ignorableErrnos.has(err.errno)) return true;
    if (typeof err?.code === 'string') {
        const ignorableCodes = new Set([
            'ER_TABLE_EXISTS_ERROR',
            'ER_DUP_FIELDNAME',
            'ER_DUP_KEYNAME',
            'ER_CANT_DROP_FIELD_OR_KEY'
        ]);
        if (ignorableCodes.has(err.code)) return true;
    }
    return false;
}

async function ensureMigrationsTable(connection) {
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
            filename VARCHAR(255) PRIMARY KEY,
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
}

async function hasMigration(connection, filename) {
    const [rows] = await connection.execute(
        'SELECT filename FROM schema_migrations WHERE filename = ? LIMIT 1',
        [filename]
    );
    return Array.isArray(rows) && rows.length > 0;
}

async function recordMigration(connection, filename) {
    await connection.execute(
        'INSERT INTO schema_migrations (filename) VALUES (?)',
        [filename]
    );
}

async function applyMigrationFile(connection, filePath) {
    const sql = fs.readFileSync(filePath, 'utf8');
    const statements = splitSqlStatements(sql);
    for (const stmt of statements) {
        try {
            await connection.execute(stmt);
        } catch (err) {
            if (isIgnorableMysqlError(err)) {
                console.log(`IGNORED: ${err.code || err.errno}: ${stmt.slice(0, 80)}...`);
                continue;
            }
            throw err;
        }
    }
}

async function check() {
    const dbHost = getRequiredEnv('DB_HOST');
    const dbUser = getRequiredEnv('DB_USER');
    const dbName = getRequiredEnv('DB_NAME');
    const dbPassword = process.env.DB_PASSWORD || '';

    console.log('Connecting to DB:', dbHost);

    const connection = await mysql.createConnection({
        host: dbHost,
        user: dbUser,
        password: dbPassword,
        database: dbName
    });

    try {
        await ensureMigrationsTable(connection);

        const migrationsDir = path.join(__dirname, '../migrations');
        const files = fs
            .readdirSync(migrationsDir)
            .filter((f) => f.endsWith('.sql'))
            .sort((a, b) => getMigrationNumber(a) - getMigrationNumber(b) || a.localeCompare(b));

        for (const file of files) {
            const applied = await hasMigration(connection, file);
            if (applied) continue;

            console.log(`Applying migration: ${file}`);
            await applyMigrationFile(connection, path.join(migrationsDir, file));
            await recordMigration(connection, file);
            console.log(`Applied: ${file}`);
        }

        console.log('Migrations complete.');
    } finally {
        await connection.end();
    }
}

check().catch((err) => {
    console.error('Migration failed:', err?.message || err);
    process.exit(1);
});
