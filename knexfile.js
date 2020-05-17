module.exports = {
  development: {
    client: "mysql",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "mysql",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
