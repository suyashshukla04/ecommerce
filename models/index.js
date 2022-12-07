const Sequelize = require('sequelize');
const config = require('../configs/db.config');

/**
 * Creating a db connection
 */

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        dialect : config.dialect,
        host : config.HOST
        }
)

/**
 * authenticating server connection
 */
sequelize.authenticate().then(()=>{
    console.log('connected');
}).catch(err => {
    console.log(`${err} is the error `);
})



// Creating db Object

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Categories = require('./category.model')(sequelize,Sequelize);
db.Products = require('./product.model')(sequelize,Sequelize);
db.User = require('./user.model')(sequelize,Sequelize);
db.Role = require('./role.model')(sequelize,Sequelize);
db.Cart = require('./cart.model')(sequelize,Sequelize);
const User = db.User;
const Role = db.Role;
const Cart = db.Cart;
const Products = db.Products;
db.ROLES = ['admin','customer'];


/**
 * Creating Many to Many Relationship Between User and Roles
 */
User.belongsToMany(Role,{
  
    through : 'user_role'
});
Role.belongsToMany(User,{
    
    through : 'user_role'
});

/**
 * Creating relationship between cart and user 
 */

User.hasMany(Cart);
Cart.belongsTo(User);

/**
 * Creating relationship between Cart and product
 */
Cart.belongsToMany(Products,{
    through : 'cart_product',
    
});
Products.belongsToMany(Cart,{
    through : 'cart_product',
 
});

module.exports = db;
