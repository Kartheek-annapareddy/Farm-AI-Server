const cloudinary=require('../model/cloudinaryconfig')
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const multer=require('multer')
const axios = require('axios')


const  storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'image_uploads',
        allowedFormats:['jpg','png','jpeg']
    }
})

const upload=multer({storage,
limits: { fileSize: 10 * 1024 * 1024 }, })


async function getdetailsfromimage(req,res){
    const url=process.env.AI_URL;
    const URL_KEY=process.env.AI_URL_KEY;
       console.log(req.file)
      if(!req.file){
        return res.status(404).json({ok:false,message:'image not found'})
      } 
      else{
        console.log('data is getting')
        //  res.write(JSON.stringify({imageUrl:req.file.path}));
         const isImageReleatedCheck=await axios.post(url,{
            model: "mistral-small",
            messages: [
                { role: "system", content: "You are an AI that checks if the image contain plant or not. Answer only 'yes' or 'no'." },
                { role: "user", content: `Is this image related to farming and agriculture? ${req.file.path}` },
            ],
            max_tokens:1
         },{
            headers:{
                "Authorization": `Bearer ${URL_KEY}`,
                "Content-Type": "application/json"
            }
         })
         
         const checkResult = isImageReleatedCheck.data.choices[0].message.content.toLowerCase().trim();
            console.log(checkResult)
              if(checkResult !=='yes'){
                return res.status(401).json({ok:true,messgae:'this image is out of the context'})
              }else{
                const getImageDetails=await axios.post(url,{
                   model: "mistral-small",
                   messages:[{
                    role:'system',content:'You are an AI that analyzes plant or agriculture-related images. Your task is to determine whether the plant is healthy or suffering from any diseases. If diseased, list the identified diseases along with their remedies'},{role:'user',content:`${req.file.path}`}],
                    max_tokens:500,
                },{
                    headers:{
                          "Authorization": `Bearer ${URL_KEY}`,
                          "Content-Type": "application/json"
                    }
                })
                return res.status(201).json({ ok: true, message: getImageDetails.data.choices[0].message.content })
   
              } 
   }
}


module.exports={upload,getdetailsfromimage}

