const controller = require('../controllers/product.contorller');
const requestValidator = require('../middleware');
module.exports = (app) => 
{
app.get('/ecom/api/v1/products',controller.findAll);
app.get('/ecom/api/v1/products/:id',controller.findOne);
app.post('/ecom/api/v1/products',[requestValidator.verifyToken,requestValidator.isAdmin,requestValidator.requestValidatorProduct],controller.create);
app.put('/ecom/api/v1/products',[requestValidator.verifyToken,requestValidator.isAdmin,requestValidator.requestValidatorProduct],controller.updateAll);
app.put('/ecom/api/v1/products/:id',[requestValidator.verifyToken,requestValidator.isAdmin],controller.updateOne);
app.delete('/ecom/api/v1/products/:id',[requestValidator.verifyToken,requestValidator.isAdmin],controller.destroy);
}