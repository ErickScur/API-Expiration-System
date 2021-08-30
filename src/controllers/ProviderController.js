const Provider = require('../models/Provider');

module.exports = {
    async index (req,res){
        const providers = await Provider.findAll({raw:true});
        return res.json(providers);
    },
    async store (req,res){
        let name = req.body.name;
        const provider = await Provider.create({
            name:name
        });
        return res.json(provider);
    },
    async show (req,res){
        let id = req.params.id;
        const provider = await Provider.findOne({where:{id:id}});
        return res.json(provider);
    },
    async update (req,res){
        let name = req.body.name;
        let id = req.params.id;
        const provider = await Provider.update({name:name},{where:{id:id}});
        return res.json(provider);
    },
    async destroy(req,res){
        let id = req.params.id;
        const provider = await Provider.destroy({
            where:{
                id:id
            }})
        return res.json(provider);
    }
}