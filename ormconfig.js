module.exports = {
    "type": process.env.DATABASE_TYPE,
    "port": process.env.DATABASE_PORT,
    "host": process.env.DATABASE_HOST,
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "databasename": process.env.DATABASE_NAME,
    "migrations": [
      "./src/database/postgresql/migrations/*.ts",
      __dirname + "./dist/database/postgresql/migrations/*.js"
    ],
    "entities": [
      "./src/persistence/postgresql/models/*.ts",
      __dirname + "./dist/persistence/postgresql/models/*.js"
    ],
    "cli": {
      "migrationsDir": "./src/database/postgresql/migrations"
    },
    "synchronize": "true"
  }