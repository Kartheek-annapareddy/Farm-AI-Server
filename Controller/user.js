const User=require('../model/model')

createUser = async (req,res)=>{
  try{
     
    const data=req.body
   
    const dataCreated=await User.create(data)
    if(dataCreated._id){
        res.status(201).json({
            ok:true,
            message:'user created sucessfully'
        })
    }else{
        res.status(402).json({
            ok:false,
            message:'failed to create the user'
        })
    }

  }catch(error){
     return res.status(500).json({
        ok:false,
        message:'error in the server',
        error:error.message
     })
  }
}


loginUser=async(req,res)=>{
    try{
         const data=req.body;
         const findEmail= await User.findOne({email:data.email})
          if(!findEmail){
            return res.status(404).json({
                ok:false,
                message:'email does not exist'
            })
          }else{
              const isMatch=findEmail.comparepassword(data.password)
              if(!isMatch){
                return res.status(401).json({
                    ok:false,
                    message:'invalid password'
                })
              }else{
                
              }
          }
    }catch(error){
        return res.status(500).json({
            ok:false,
            message:'internal server error'
        })
    }
}



module.exports={createUser,loginUser}


