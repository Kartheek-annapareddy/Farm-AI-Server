const express=require('express')
const userConnection=require('../Controller/user')
const {acessesTokenverification,refreshToknverification}=require('../auth/authverify')
const router=express.Router();
const {addImageincloudinary,getdetailsfromimage}=require('../Controller/imgAiInfo')



router.post('/signUp',userConnection.createUser)

router.post('/login',userConnection.loginUser)

router.get('/refreshToken',refreshToknverification,userConnection.tokenExpiredHandeling)

router.get('/getuserdetails',acessesTokenverification,userConnection.getuserdetails)

router.put('/addcrop/:crop',acessesTokenverification,userConnection.addcropdetails)

router.put('/image/upload',(req, res, next) => {
    console.log('Before Multer Middleware',req.file);
    next();
},addImageincloudinary,getdetailsfromimage)

router.get('/logout',userConnection.logOut)




module.exports=router;