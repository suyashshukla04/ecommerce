/**
 * This File is for Validating request 
 */

const requestValidatorCategory = (req, res, next) => {
    if(!req.body.name){
        res.status(400).send({
            message:'Name of category is not provided'
        })
        return
    }
    if(!req.body.description) {
        res.status(400).send({
            message : 'Description of category is not provided'
        })
        return
    }

    next();
    
}

const requestValidatorProduct = (req, res, next) => {
    if(!req.body.name) {
        res.status(400).send({
            message : 'Product Name not provided'
        });
        return ;
    }
    if(!req.body.description) {
        res.status(400).send({
            message : 'Product Description is not Provided'
        })
        return ;
    }
    if(req.body.cost<=0) {
        res.status(400).send({
            message : 'Price can not be zero or Negative'
        })
    }
    next();
}
module.exports = {
    requestValidatorCategory,
    requestValidatorProduct
}