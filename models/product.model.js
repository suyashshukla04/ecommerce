


module.exports = (sequelize,Sequelize) => {
    const Product = sequelize.define('Products',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true
        },
        name : 
        {
            type :Sequelize.STRING
        },
        price : 
        {
            type : Sequelize.INTEGER
        }
    })
    return Product;
}