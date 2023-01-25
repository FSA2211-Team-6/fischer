const Sequelize = require("sequelize");
const db = require("../db");

const Website = db.define("website", {
  host: {
    type: Sequelize.STRING,
  },
  articleURL: {
    type: Sequelize.STRING,
  },
});

module.exports = Website;
