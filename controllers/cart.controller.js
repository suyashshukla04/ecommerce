/**
 * This file will contain Handler for  carts
 */


const db = require('../models');
const Cart = db.Cart;
const Product = db.Products;

exports.create = async(req,res) => {
    try {
      let info = {
          userId : req.userId
      }
      const cart = await Cart.create(info);
      res.status(200).send({cart});
    }
    catch(err){
        res.status(400).send(err);
    }
}

exports.update = async(req,res) => {
    try 
    {
        /**
         * Checking if the cart is present or Not 
         */

        const cartId = req.params.id;
        const cart = await Cart.findByPk(cartId);
        if(!cart)
        {
            res.status(400).send({
                message : 'Cart is Not available'
            })
        }
        /**
         * fetching products based on productIds provided in the req.body
         */

        const productIds = req.body.productIds;
        const products = await Product.findAll({where : {
            id : productIds
        }})
        if(!products)
        {
            res.status(400).send({
                message : 'Products trying to add doesnt exit'
            })
        }
        /**
         * setting product to cart 
         */

        await cart.setProducts(products);
        console.log('Products to be set are ',products)
        var cost = 0;
        var productSelected = [];
        const cartProducts = await cart.getProducts();
        
        for(i=0;i<cartProducts.length;i++)
        {
            productSelected.push({
                id:cartProducts[i].id,
                name : cartProducts[i].name,
                price : cartProducts[i].price

            })
            console.log('product has been pushed');
            cost = cost + cartProducts[i].price;
        }
        res.status(200).send({
            id : cartId,
            productSelected : productSelected,
            totalCost : cost
        })
    }
    catch(err){
        console.log('error is ',err);
        res.status(400).send(err);
    }
}

/**
 * Search for a Cart based on id
 */

exports.getCart = async(req,res) =>
 {
    try {
    const cartId = req.params.id;
    const cart = await Cart.findByPk(cartId);
     var cost = 0;
        var productSelected = [];
        const cartProducts = await cart.getProducts();
        
        for(i=0;i<cartProducts.length;i++)
        {
            productSelected.push({
                id:cartProducts[i].id,
                name : cartProducts[i].name,
                price : cartProducts[i].price

            })
            console.log('product has been pushed');
            cost = cost + cartProducts[i].price;
        }
        res.status(200).send({
            id : cartId,
            productSelected : productSelected,
            totalCost : cost
        })
    }catch(err){
        res.status(400).send({
            message : err
        })
    }

}