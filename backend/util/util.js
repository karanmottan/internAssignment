const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtConfig} = require('../config/env');


const util = {};

util.checkPassword = async(password,hash) => {
    
    const result = await bcrypt.compare(password,hash);
    
    return result;
}

util.getJWT = async(id,email) => {
    
    const token = jwt.sign({id: id,email: email}, jwtConfig.secret);
    
    return token;
}

util.hash = async(plainText) => {
    const password = await bcrypt.hash(plainText,10);
    return password;
}

util.verifyJwt = async(token) => {

    return jwt.verify(token,jwtConfig.secret, (err,dec) => {
        if(err){
            return {err: err};
        }else{
            return {data : dec};
            
        }
       
    })
}

module.exports = util;