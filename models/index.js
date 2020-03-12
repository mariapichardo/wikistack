const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');



const Page = db.define('page', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: true
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('open', 'closed')
    }
  });
  
const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });
  
 module.exports = { db, Page, User };

// User.beforeCreate((userInstance) => {
//     console.log('About to validate ', userInstance)
// })

// User.hasMany(Page)
// Page.hasMany(User)


console.log(db);