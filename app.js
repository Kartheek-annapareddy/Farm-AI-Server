const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyparser=require('body-parser')
const router=require('./Routes/route')
const createConnection=require('./model/connection')
const cookiesParser=require('cookie-parser')
const http=require('http');
const webSocketSetUp=require('./Controller/aiinformation')

const app=express();

server=http.createServer(app)

dotenv.config();
const port=process.env.PORT_NUMBER;


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

webSocketSetUp(server)



app.use('/Farm',router)





server.listen(port,(err)=>{
    if(err){
        console.log('error in server',err)
    }
    else{
        console.log('server is running...')
    }
})

