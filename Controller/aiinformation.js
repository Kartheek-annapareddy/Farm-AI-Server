const webSockets = require('ws');
const axios = require('axios');
require('dotenv').config();
const cookie = require('cookie');
const jwt=require('jsonwebtoken')


const URL = process.env.AI_URL
const URL_KEY = process.env.AI_URL_KEY

function webSocketSetUp(server) {
   
    //creation of websocketserver
    const wss = new webSockets.Server({ server })

    wss.on('connection', (ws,req) => {
        // console.log(req.headers.cookie)
        const cookies=cookie.parse(req.headers.cookie)
        const token=cookies.acessesToken;
       if(token){
        const verify=jwt.verify(token,process.env.acessesToken)
        if(!verify){
           ws.close();
        }else{
           console.log('user is connected')
           ws.send('connection is created')
   
           ws.on('message', async (message) => {
               const data = JSON.parse(message.toString());
               console.log(data)
   
               if (!data.message) {
                   ws.send(JSON.stringify({ ok: false, message:'message is missing' }))
               }
               else {
                   const checkResponse = await axios.post(URL, {
                       model: "mistral-small",
                       messages: [
                           { role: "system", content: "You are an AI that checks if a question is related to farming or agriculture or agriculture related machinery (such as tractors, harvesters, irrigation systems, etc.). Answer only 'yes' or 'no'." },
                           { role: "user", content: `Is this question related to farming and agriculture? ${data.message}` }
                       ],
                       max_tokens:1
                   },
                       {
                           headers: {
                               "Authorization": `Bearer ${URL_KEY}`,
                               "Content-Type": "application/json"
                           }
                       });
   
                   const checkResult = checkResponse.data.choices[0].message.content.toLowerCase().trim();
                    //  console.log(checkResult)
   
                   if (checkResult !== 'yes') {
                       ws.send(JSON.stringify({ ok: true, message: 'This question is out of my context' }))
                   }
                   else {
   
                       var response = await axios.post(URL, {
                           model: "mistral-small",
                           messages: [{role:'system',content:'You are the AI that checks the question and give the valid answer with conclusion with in the max_tokens'},{ role: "user", content: data.message }],
                           max_tokens: 500
                       },
                           {
                               headers: {
                                   "Authorization": `Bearer ${URL_KEY}`,
                                   "Content-Type": "application/json"
                               }
                           })
   
                       ws.send(JSON.stringify({ ok: true, message: response.data.choices[0].message.content }))
   
                   }
               }
           })
           ws.on('close', () => {
               console.log('connection has been closed')
           })    
        }
       }
    }) 
}

module.exports = webSocketSetUp;