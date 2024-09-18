const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// User has many BlogPosts
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// BlogPost belongs to User
BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

// BlogPost has many Comments
BlogPost.hasMany(Comment, {
  foreignKey: 'blog_post_id',
  onDelete: 'CASCADE',
});

// Comment belongs to User and BlogPost
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'blog_post_id',
});

module.exports = { User, BlogPost, Comment };
