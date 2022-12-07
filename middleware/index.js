const {requestValidatorCategory,requestValidatorProduct}  = require('./requestValidator');
const {checkDuplicatesUsernameOrEmail,checkRoles} = require('./signupValidator');
const {verifyToken,isAdmin} = require('./jwt.auth')

module.exports = {
    requestValidatorCategory,
    requestValidatorProduct,
    checkDuplicatesUsernameOrEmail,
    checkRoles,
    verifyToken,
    isAdmin
}