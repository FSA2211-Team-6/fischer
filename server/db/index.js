const db = require("./db");

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Website = require("./models/Website");
const WebsiteArticle = require("./models/WebsiteArticle");

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

WebsiteArticle.belongsTo(Post);
Post.hasOne(WebsiteArticle);

WebsiteArticle.belongsTo(Website);
Website.hasMany(WebsiteArticle);

Post.has;
module.exports = {
  db,
  models: {
    User,
    Post,
    Comment,
    Website,
    WebsiteArticle,
  },
};
