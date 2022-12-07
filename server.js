const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const serverConfig = require('./configs/server.config');
const db = require('./models');
const { Sequelize, Role, User } = require('./models');
const Categories = db.Categories;
const Products = db.Products;



/**
 * creating one to many Association between 
 * category and product 
 */
 
Categories.hasMany(Products,{
    foriegnKey : 
    {
        type : Sequelize.INTEGER,
        allowNull : false,
        as : "category"
    }
});
Products.belongsTo(Categories);


/**
 * creating a tables
 */

db.sequelize.sync({force:true}).then(()=> {
    console.log('tables have been created');
    init();
}).catch(err => {
    console.log(`${err} this is the error`);
})

require('./routes/category.route')(app);
require('./routes/product.route')(app);
require('./routes/auth.route')(app);
require('./routes/cart.route')(app);



app.listen(serverConfig.PORT,()=> {
    console.log(`Server running at port NO. ${serverConfig.PORT}`);
})


async function init() {
    try{
    var categories = [
        {
            name : 'Electronics',
            description : 'This is digital item category'
        },
        {
            name : 'Books',
            description : 'This category is for reading'
        }
    ];
    await Categories.bulkCreate(categories);
    console.log('Categories are created at the time of booting ');
    await Role.create({
         id : 1,
        name : 'admin'
    })
    await Role.create({
        id : 2,
        name : 'customer'
    })
    
    console.log(Object.keys(Role.prototype));
    console.log(Object.keys(User.prototype));
}

catch(err) {
    
    console.log(`for not creating bulkCategorie we got an error which is ${err}`);
}
    
}