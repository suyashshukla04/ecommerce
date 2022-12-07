const controller = require('../controllers/category.controller');
const requestValidator = require('../middleware');


module.exports = (app) => 
{
    app.post('/ecom/api/v1/categories',[requestValidator.verifyToken,requestValidator.isAdmin,requestValidator.requestValidatorCategory],controller.create);
    app.get('/ecom/api/v1/categories',controller.findAll);
    app.get('/ecom/api/v1/categories/:id',controller.findOne);
    app.put('/ecom/api/v1/categories/:id',[requestValidator.verifyToken,requestValidator.isAdmin],controller.update);
    app.delete('/ecom/api/v1/categories/:id',[requestValidator.verifyToken,requestValidator.isAdmin],controller.delete);
}