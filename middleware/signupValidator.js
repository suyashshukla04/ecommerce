const { User, ROLES } = require("../models");


const checkDuplicatesUsernameOrEmail = async(req,res,next) => {

    /**
     * Checking if username is present or not 
     */
   const username =  await User.findOne({where : {
        username : req.body.username
    }})
    if(username){
        res.status(400).send({
            message : 'username Already present'
        })
    }
    /**
     * Checking if email is present or not 
     */

    const email = await User.findOne({where :{ 
    email : req.body.email
    }})
    if(email) {
        res.status(400).send({
            message : 'email already present'
        })
    }
    next () ;
}
const checkRoles = async(req,res,next) => {
    if(req.body.roles){
        for(i=0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message : 'Role is invalid'
                })
                return ;
            }
        }
    }
    next();
}
module.exports = {
    checkDuplicatesUsernameOrEmail,
    checkRoles
}