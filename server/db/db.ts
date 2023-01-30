import pkg from "../../package.json";

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

// LOCALHOST CONNECTION STRING
// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`
// );

// DEPLOYED CONNECTION STRING
// const db = new Sequelize(process.env.DATABASE_URL);
