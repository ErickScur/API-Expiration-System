const jwt = require('jsonwebtoken');
const User = require('./models/User');
const JWTSecret = "d81qyr7284nv544568af36tynr427865vb47282";

function auth(req,res,next){
    const authToken = req.headers['authorization'];
    if(authToken!=undefined){
        let bearer = authToken.split(' ');
        let token = bearer[1];

        jwt.verify(token,JWTSecret,(err, data)=>{
            if(err){
                res.status(401)
                res.json({err:"Invalid Access Token!"});
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, login: data.login, admin: data.admin};
                next()
            }
        })
    }else{
        res.status(401);
        res.json({err:"Invalid Access Token!"});
    }
    
}
module.exports = auth;