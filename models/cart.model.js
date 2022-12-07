/**
 * This file will contain Schema of cart 
 */

module.exports = (sequelize,Sequelize) => {
    const cart = sequelize.define('carts',{
      id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
        cost : {
            type : Sequelize.INTEGER
        }

    })
    return cart ; 
}

