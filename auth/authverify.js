const jwt=require('jsonwebtoken')
require('dotenv').config()


const acessesSecretKey=process.env.acessesToken;
const refreshSecretKey=process.env.refreshToken;


const acessesTokenverification=(req,res,next)=>{
    const acessesToken=req.cookies.acessesToken
    
   if(!acessesToken){
    return res.status(404).json({
        ok:false,
        message:'token not found'
    })
   }else{
      jwt.verify(acessesToken,acessesSecretKey,(err,payload)=>{
         if(err){
            return res.status(401).json({
                ok:false,
                token:'token is expired'
            })
         }else{
            req.user=payload;
            next();
         }
      })
   }
}



const refreshToknverification=(req,res,next)=>{
    const refreshToken=req.cookies.refreshToken
    console.log(refreshToken)
    console.log(refreshSecretKey)
    
   if(!refreshToken){
    return res.status(404).json({
        ok:false,
        message:'token not found'
    })
   }else{
      jwt.verify(refreshToken,refreshSecretKey,(err,payload)=>{
         if(err){
            return res.status(401).json({
                ok:false,
                token:'refesh token is expired'
            })
         }else{
            req.user=payload;
            next();
         }
      })
   }
}


module.exports={acessesTokenverification,refreshToknverification}
