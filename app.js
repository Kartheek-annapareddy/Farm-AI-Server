const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyparser=require('body-parser')
const router=require('./Routes/route')
const createConnection=require('./model/connection')
const cookiesParser=require('cookie-parser')

dotenv.config();
const port=process.env.PORT_NUMBER;
const app=express();

app.use(cors(
    {
        origin:'*',
        methods:['GET','POST','PUT','DELETE'],
        credentails:true
    }
))

createConnection();

app.use(cookiesParser())

app.use(bodyparser.json());


app.use('/Farm',router)



app.listen(port,(err)=>{
    if(err){
        console.log('error in server',err)
    }
    else{
        console.log('server is running...')
    }
})