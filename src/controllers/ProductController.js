const Product = require('../models/Product');

module.exports = {
    async index (req,res){
        const products = await Product.findAll({raw:true, order: [
            ['expirationDate','ASC']
        ]});
        return res.json(products);
    },
    async store (req,res){
        const {name, providerId} = req.body;
        let expirationDate = new Date();
        const product = await Product.create({
            name:name,
            expirationDate: expirationDate,
            providerId: providerId
        });
        return res.json(product);
    },
    async show (req,res){
        let id = req.params.id;
        const product = await Product.findOne({where:{id:id}});
        return res.json(product);
    },
    async update (req,res){
        const {name, providerId} = req.body;
        let expirationDate = new Date();
        let id = req.params.id;
        const product = await Product.update({name:name,expirationDate:expirationDate,providerId:providerId},{where:{id:id}});
        return res.json(product);
    },
    async destroy (req,res){
        let id = req.params.id;
        const product = await Product.destroy({
            where:{
                id:id
            }})
        return res.json(product);
    }
}