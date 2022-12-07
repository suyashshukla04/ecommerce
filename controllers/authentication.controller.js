const bcrypt = require('bcryptjs');
const db = require('../models');
const jwt = require('jsonwebtoken')
const {scretKey} = require('../configs/secretKey.config')
const Role = db.Role;
const User = db.User;
const Op = db.Sequelize.Op;

exports.signUp = async(req,res)=> {
    try {
    const userObj = {
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8)
    }
    const user = await User.create(userObj);
    if(req.body.roles)
    {
        const role = await Role.findAll({where : {
            name : {
                [Op.or]:req.body.roles
            }
        }})
       await user.setRoles(role);
        res.status(200).send({
            message :'User is created'
        })
    }
    else {
        const role = await Role.findOne({where :{
            name : 'customer'
        }})
       await user.setRoles(role);
        res.status(200).send({
            message : 'User created with default Role'
        })
    }
}
catch(err) {
res.status(400).send(err);
}
}

exports.signIn = async(req,res) => {
    try {
    const user = await User.findOne({where : {
        email : req.body.email
    }})
    if(!user)
    {
        res.status(400).send({
            message : 'User Not Present'
        })
    }
    var verifyPassword = await bcrypt.compare(req.body.password,user.password);
    if(!verifyPassword)
    {
        res.status(400).send({
            message : 'Wrong Password'
        })
    }
    var token = await jwt.sign({id:user.id},scretKey,{
        expiresIn:3000 // Token will expire in 3000 seconds
    })

    /**
     * If you want to pass Role of User with Response Body
     */

    var authorities = [];
    let roles = await user.getRoles();
    for(i=0;i<roles.length;i++){
        authorities.push(roles[i].name);
    }
    res.status(200).send({
        id:user.id,
        username : user.username,
        email : user.email,
        accessToken : token,
        roles : authorities
    })
}
catch(err) {
    res.status(400).send(err);
}

}