const User=require('../model/model')
const {generateAcessesToken,generateRefreshToken}=require('../auth/auth')

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
         const findEmail= await User.findOne({email:data.email}).select("+password")
          if(!findEmail){
            return res.status(404).json({
                ok:false,
                message:'email does not exist'
            })
          }else{
               console.log(data.password)
              const isMatch= await findEmail.comparepassword(data.password)
              console.log(isMatch)
              if(!isMatch){
                return res.status(401).json({
                    ok:false,
                    message:'invalid password'
                })
              }else{
                // console.log('sucesses')
                // console.log(findEmail)
                 const acessesToken= await generateAcessesToken(findEmail.email)
                 const refreshToken= await generateRefreshToken(findEmail.email)

                //  console.log(acessesToken)
                //  console.log(refreshToken)

                 res.cookie('acessesToken',acessesToken,{httpOnly:true,secure:false})
                 res.cookie('refreshToken',refreshToken,{httpOnly:true,secure:false})

                 res.status(200).json({
                    ok:true,
                    message:'user logged in sucessfully'
                 })
              }
          }
    }catch(error){
        return res.status(500).json({
            ok:false,
            message:'internal server error',
            error:error.message
        })
    }
}


tokenExpiredHandeling=async(req,res)=>{
    try{
         const data=req.user
         const newAcessesToken=generateAcessesToken(data)
         res.cookie('acessesToken',newAcessesToken,{httpOnly:true,secure:false})
         return res.status(201).json({
            ok:true,
            message:'new token has generated '
         })


    }catch(error){
        return res.status(500).json({
            ok:false,
            message:'internal server error',
            error: error.message
        })
    }
}


getuserdetails=async(req,res)=>{
   try{

    const userEmail=req.user;
    console.log(userEmail);
    const userData = await User.findOne({email:userEmail.data});
    if(!userData){
        return res.status(401).json({
          ok:false,
          message:'some thing went wrong'
        })
    }else{
       return res.status(200).json({
          ok:true,
          message:'user details fetched',
          details:userData
       })
    }

   }catch(error){
     return res.status(500).json({
        ok:false,
        error:error.message
     })
   }
}

addcropdetails = async(req,res)=>{
    try{
        const {email}=req.user;
        const {crop}=req.params;
      const addedcrop=User.updateOne({email:email},{$push:{crop:crop}})

      if(addedcrop.modifiedCount===0){
        return res.status(401).json({
            ok:false,
            message:'check the format of data that is sent in params'
        })
      }else{
        return res.status(201).json({
            ok:true,
            message:'data added sucessfully'
        })
      }
       
    }catch(error){
     return res.status(500).json({
        ok:false,
        message:error.message
     })
    }
}


module.exports={createUser,loginUser,tokenExpiredHandeling,getuserdetails,addcropdetails}


