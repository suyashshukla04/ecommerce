/**
 * This File Will Contain Middleware for Verifying Token
 */
const jwt = require('jsonwebtoken');
const {scretKey}= require('../configs/secretKey.config');
const db = require('../models');
const User = db.User;
const verifyToken = async(req, res, next) => {

    // we provide token through a variable which is present in headers x-access-token

    var token = req.headers['x-access-token'];
    if(!token){
        res.status(400).send({
            message : 'token not provided'
        })
        return ; 
    }
    /**
     * Now If The Token is present check if it is a valid token or not 
     * we will require('jsonwebtoken') library to access verify method of it 
     * verify require 3 parameter token (we want to verify), secretkey, (err,decodedToken)
     * let import secretKey
     */

      jwt.verify(token,scretKey,(err,decodedToken)=> {
         if(err){
             res.status(400).send(err)
             return ; 
         }
         req.userId = decodedToken.id ;
         next();
     })

}

const isAdmin  = async(req,res,next) => {
         const user = await User.findByPk(req.userId);
         const roles = await user.getRoles();
         for(i=0;i<roles.length;i++){
             if(roles[i].name =='admin'){
                 next();
                 return
             }

        }
         res.status(400).send({
             message : 'Invalid Role'
         })
         return 

     }
module.exports = {
    verifyToken,
    isAdmin
}