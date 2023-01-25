const Sequelize = require("sequelize");
const db = require("../db");

const WebsiteArticle = db.define("website", {
  articleURL: {
    type: Sequelize.STRING,
  },
});

module.exports = WebsiteArticle;
