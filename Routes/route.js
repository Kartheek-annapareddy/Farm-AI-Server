const express=require('express')
const userConnection=require('../Controller/user')
const {acessesTokenverification,refreshToknverification}=require('../auth/authverify')
const router=express.Router();



router.post('/signup',userConnection.createUser)

router.post('/login',userConnection.loginUser)

router.get('/refreshToken',refreshToknverification,userConnection.tokenExpiredHandeling)

router.get('/getuserdetails',acessesTokenverification,userConnection.getuserdetails)

router.put('/addcrop/:crop',acessesTokenverification,userConnection.addcropdetails)

router.get('/logout',userConnection.logOut)




module.exports=router;