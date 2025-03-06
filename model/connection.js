const mongoose=require('mongoose')
require('dotenv').config()

const MONGO_URI=process.env.MONGO_URI

async function createConnection(){
    try{
         await mongoose.connect(MONGO_URI)
         console.log('data base is connected')
    }catch(error){
         console.log('error in connnecting',error)
         process.exit(1)
    } 
}

module.exports=createConnection;