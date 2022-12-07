const db = require('../models');
const Category = db.Categories;
console.log('We are in the controllers');

exports.create = async(req, res) => {
    try{
    const info = {
        name : req.body.name,
        description : req.body.description
    }
    const category = await Category.create(info);
    res.status(200).send(category);
}
catch(err) {
    res.status(400).send(err);
}
}

exports.findAll = async (req,res) => {
    try{
    const categoryName = req.query.name;
    var categories;
    if(categoryName) {
         categories = await Category.findAll({where : {
            name : categoryName
        }});
    }  
    else
    {
     categories = await Category.findAll();
    
    }
    res.status(200).send(categories);
    }
    catch(err) {
        res.status(400).send(err);
    }
}

exports.findOne = async(req,res) => {
    try {
    let id = req.params.id;
    const category = await Category.findOne({where : {id : id }});
    res.status(200).send(category);
    }
    catch(err){
        res.status(400).send(err);
    }
}

exports.update = async(req,res) => {
    try{
        let id = req.params.id;
        await Category.update(req.body,{where : {id : id}});
        const category = await Category.findOne({where : {id : id }});
        res.status(200).send(category);
}
catch(err) {
    res.status(400).send(err);
}
}
exports.delete = async(req,res) => {
    try{
        let id = req.params.id;
        await Category.destroy({where : {id : id}});
        res.status(200).send('product got Deleted');
    }
    catch(err) {
        res.status(400).send(err);
    }
}

