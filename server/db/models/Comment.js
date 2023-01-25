const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  comment: {
    type: Sequelize.TEXT,
  },
  upvotes: {
    type: Sequelize.INTEGER,
    allowNegative: true,
  },
});

module.exports = Comment;
