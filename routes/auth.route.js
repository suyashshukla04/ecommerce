const authController = require('../controllers/authentication.controller');
const signupValidators = require('../middleware')

module.exports = (app) => {
    app.post('/ecom/api/v1/auth/signup',[signupValidators.checkDuplicatesUsernameOrEmail,signupValidators.checkRoles],authController.signUp);
    app.post('/ecom/api/v1/auth/signIn',authController.signIn); 
}