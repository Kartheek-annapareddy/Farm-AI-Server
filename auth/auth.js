const jwt=require('jsonwebtoken')
require('dotenv').config()

const acessesSecretkey=process.env.acessesToken;


const refreshSecretkey=process.env.refreshToken;


const generateAcessesToken=async function(data){
     const acessesToken=jwt.sign({data},acessesSecretkey,{expiresIn:'15m'})
     return acessesToken
}

const generateRefreshToken=async function(data){
    const refreshToken=jwt.sign({data},refreshSecretkey,{expiresIn:'7d'})
    return refreshToken
}


module.exports={generateAcessesToken,generateRefreshToken};
