const Product = require('../models/Product');
const Provider = require('../models/Provider');

module.exports = {
    async index (req,res){
        const products = await Product.findAll({raw:true, order: [
            ['expirationDate','ASC']
        ]});
        return res.json(products);
    },
    async store (req,res){
        const {name, providerId, barcode, expirationDate} = req.body;
        let provider = await Provider.findOne({where:{id:providerId}});
        let providerName = provider.name;
        const product = await Product.create({
            name:name,
            expirationDate: expirationDate,
            providerId: providerId,
            barcode:barcode,
            providerName:providerName
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
    },
    async findByBarcode (req,res){
        let barcode = req.params.barcode;
        const product = await Product.findOne({where:{barcode:barcode}});
        return res.json(product);
    },
    async findByProviderId(req,res){
        let providerId = req.params.providerId;
        const product = await Product.findAll({where:{providerId:providerId}});
        return res.json(product);
    }
}