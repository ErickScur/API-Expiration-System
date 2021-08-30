const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWTSecret = "d81qyr7284nv544568af36tynr427865vb47282";

module.exports = {
    async index (req,res){
        const users = await User.findAll({raw:true});
        return res.json(users);
    },
    async store (req,res){
        let login = req.body.login;
        let password = req.body.password;
        let admin = req.body.admin;
        let loggedUser = req.loggedUser;
        if(loggedUser.admin == 0){
            res.status(401);
            res.json({err:"Permission Denied!"});
        }else{
            const user = await User.create({
                login:login,
                password:password,
                admin:admin
            });
            return res.json(user);
        }
    },
    async show (req,res){
        let id = req.params.id;
        const user = await User.findOne({where:{id:id}});
        return res.json(user);
    },
    async update (req,res){
        let login = req.body.login;
        let password = req.body.password;
        let admin = req.body.admin;
        let id = req.params.id;
        let loggedUser = req.loggedUser;
        if(loggedUser.admin == 0){
            res.status(401);
            res.json({err:"Permission Denied!"});
        }else{
            const user = await User.update({
                login:login,
                password:password,
                admin:admin
            },{where:{id:id}});
            return res.json(user);
        }
        
    },
    async destroy(req,res){
        let id = req.params.id;
        let loggedUser = req.loggedUser;
        if(loggedUser.admin == 0){
            res.status(401);
            res.json({err:"Permission Denied!"});
        }else{
           const user = await User.destroy({
            where:{
                id:id
            }})
            return res.json(user); 
        }

    },
    async auth(req,res){
        let {login, password} = req.body;
        if(login!= undefined){
            let user = await User.findOne({where:{login:login}});
            if(user != undefined){
                if(user.password == password){
                    jwt.sign({id: user.id, login:user.login, admin:user.admin},JWTSecret,{expiresIn:'24h'},(err,token)=>{
                        if(err){
                            res.status(400);
                            res.json({err:"failed"})
                        }else{
                            res.status(200);
                            res.json({token:token});
                        }
                    });
                    
                }else{
                    res.status(401);
                    res.json({err:"Invalid Password"});
                }
            }else{
                res.status(404);
                res.json({err:"Login doesn`t exist!"});
            }
        }else{
            res.status(400);
            res.json({err:"Invalid Login!"});
        }
    }
}