const Sequelize = require("sequelize");
const pkg = require("../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

// LOCALHOST CONNECTION STRING
// const db = new Sequelize(
//     process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`
// )

// DEPLOYED CONNECTION STRING
const db = new Sequelize(
  "postgresql://postgres:[LyuCcFZoHWxWBv2ozAuV]@db.uuskembvwjyhjhorlagq.supabase.co:5432/postgres"
);

module.exports = db;
