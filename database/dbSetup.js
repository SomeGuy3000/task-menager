const knex = require('knex')({
    client: 'mysql',
    connection: {
        "host":     process.env.DATABASE_HOST_IP,
        "user":     process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME
    }
});

module.exports = knex;