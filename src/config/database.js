const { dev_db, db: { username, password, database, host, } } = require('./index.js');

module.exports = {
  development: {
    storage: dev_db,
    dialect: 'sqlite',
    seederStorage: 'sequelize',
    logQueryParameters: true,
    typeValidation: true,
    benchmark: true,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    seederStorage: 'sequelize'
  }
}
