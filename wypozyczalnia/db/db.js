const pgPromise = require('pg-promise');

const pgp = pgPromise({
    capSQL: true
});

const db = pgp({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    // opcjonalnie:
    max: 20,
    idleTimeoutMillis: 30000
});

module.exports = db;