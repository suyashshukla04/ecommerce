/**
 * This file will Contain path/endpoints for Cart schema
 */
const cartController = require('../controllers/cart.controller')
const requestValidator = require('../middleware');

module.exports = (app) => {
    app.post('/ecom/api/v1/cart',[requestValidator.verifyToken],cartController.create);
    app.put('/ecom/api/v1/cart/:id',[requestValidator.verifyToken],cartController.update);
    app.get('/ecom/api/v1/cart/:id',[requestValidator.verifyToken],cartController.getCart);
}