const express=require('express')
const userConnection=require('../Controller/user')

const router=express.Router();



router.post('/signup',userConnection.createUser)

router.post('/login',userConnection.loginUser)





module.exports=router;