const Sequelize = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
  fact: {
    type: Sequelize.TEXT,
  },
  redCount: {
    type: Sequelize.INTEGER,
  },
  yellowCount: {
    type: Sequelize.INTEGER,
  },
  greenCount: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Post;
