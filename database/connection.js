const { Pool } = require("pg");

const pool = new Pool({

    host: "localhost",

    port: 5432,

    user: "postgres",

    password: "P@lmeiras1994",

    database: "igreja"

});

module.exports = pool;