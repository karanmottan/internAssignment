const services = require('../services/services');
const util = require('../util/util');

const userController = {};

userController.login = async(req,res) => {
    
    try{
        const {email,password} = req.body;
        
        const user = await services.findUser(email);
        
        if(!user){
            res.send({status: 'error', error: 'Invalid UserName/Password'});
        }
        
        if(await util.checkPassword(password,user.password)){
            const token = await util.getJWT(user._id,email);
            res.send({status: 'ok', token: token, id: user._id});
        }else{
            console.log('here');
            res.send({status: 'error', error: 'Invalid Username/Password'});
        }
    }catch(error){
        res.send({status: 'error', error: error});
    }
}

userController.register = async(req,res) => {
    const {email , password : plainText} = req.body;
    const password = await util.hash(plainText);
    try{
        const result = await services.createUser(email,password);
        
        res.send(result);
    }catch(error){
        if(error.code == 11000){
            return res.json({status : 'error', error: 'Email already in use'});
        }else return res.json({status: 'error', error: error});
    }
}

module.exports = userController;