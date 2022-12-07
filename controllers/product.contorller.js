const db = require('../models');
const Products = db.Products;

exports.create = async(req,res) => {
    try{
        let info = 
        {
            id : req.body.id,
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            categoryId:req.body.categoryId,
        }
        const product = await Products.create(info);
        res.status(200).send(product);
    }
    catch(err) {
        res.status(400).send(err);
    }
}

exports.findAll = async(req,res) =>  {
try {
    var product;
    const productName = req.query.name;
    if(productName) {
        product = await Products.findAll({where : {
            name : productName
        }})
    }
    else {
        product = await Products.findAll({});

    }
    res.status(200).send(product);
}
catch(err) 
{
    res.status(400).send(err);
}
}

exports.findOne = async(req,res) =>{
    try{
        let id = req.params.id;
        const product =  await Products.findByPk(id);
        res.status(200).send(product);
    }
    catch(err) {
        res.status(500).send(err);
    }
}

exports.updateOne = async(req,res) => {
    try{
        let id = req.params.id;
        await Products.update(req.body,{where : {id : id}});
        const updatedProduct = await Products.findByPk(id);
        res.status(200).send(updatedProduct);
    }
    catch(err) {
        res.status(500).send(err);
    }
}
exports.updateAll = async(req,res) => {
    try {
        await Products.update(req.body,{});
        const updatedProduct = await Products.findAll();
        res.status(200).send(updatedProduct);
    }
    catch(err) {
        res.status(400).send(err);
    }
}

exports.destroy = async(req,res) => {
    try{
        let id = req.params.id;
        await Products.destroy({where : {id : id}});
        res.status(200).send('Product destroyed');
    }
    catch(err)
    {
        res.status(400).send(err);
    }
}