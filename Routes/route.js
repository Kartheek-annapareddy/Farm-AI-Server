const express=require('express')
const userConnection=require('../Controller/user')
const {acessesTokenverification,refreshToknverification}=require('../auth/authverify')

const router=express.Router();



router.post('/signup',userConnection.createUser)

router.post('/login',userConnection.loginUser)

router.get('/refreshToken',refreshToknverification,userConnection.tokenExpiredHandeling)





module.exports=router;