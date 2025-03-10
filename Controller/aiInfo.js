require('dotenv').config()
const axios = require('axios');

const port=process.env.PORT_NUMBER

const apikey=process.env.OPENAIKEY

const openai=new openAI({
    apiKey:apikey
})

getAiResponse=async(req,res)=>{
   

  const API_KEY="nKWS0toVNJ9CkHzng75f1P5CMj3ttAuB"

    const url = "https://api.mistral.ai/v1/chat/completions";
    
        const response = await axios.post(url, {
            model: "mistral-small",
            messages: [{ role: "user", content: "How to grow paddy crop oveview ?" }],
            max_tokens: 1000
        },
        {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });
        // console.log(response.data.choices[0].message.content);

        res.status(200).json({
            data:response.data.choices[0].message.content
        })
    }
    
   
    


module.exports={getAiResponse}