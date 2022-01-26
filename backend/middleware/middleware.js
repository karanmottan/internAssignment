const util = require('../util/util');

const middleware = {
    authenticate : function(req,res, next){
        const token = req.query.token || req.body.token;
        
        const jwtRes = util.verifyJwt(token);
        if(jwtRes.err){
            res.send({status: 'error', error: 'Invalid Token'});
        }else next();
    }
}

module.exports = middleware;