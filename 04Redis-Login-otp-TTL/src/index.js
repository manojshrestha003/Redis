
import  express from 'express'
import Redis from 'ioredis'


const app = express();
app.use(express.json())
const redis  = new Redis (process.env.REDIS_URL || 'redis://localhost:6379')

function otpKey(phone){
    return `otp:${phone}`
}


app.post('/otp', async(req , res)=>{
    const {phone} = req.body
    const otp = Math.floor(10000+ Math.random()*900000).toString();
    await redis.set(otpKey(phone), otp, 'EX', 30) //Valid for 30 sec
    res.json({message: "OTP sent", otp})
})


app.post('/otp/verify', async (req  , res)=>{
    const {phone, otp} = req.body;
    const savedOtp = await redis.get(otpKey(phone))

    if(!savedOtp){
        return res.status(400).json({message:"OTP expired or not found "})
    }

    if(savedOtp !== otp){
       return res.status(400).json({message:"Jnvalid OTP"});
    }

    await redis.del(otpKey(phone));
    res.json({message:"OTP verified successfully"})
})


app.get('/otp/:phone/ttl', async (req , res)=>{
    const ttl = await redis.ttl(otpKey(req.params.phone));

    res.json({ttl})
})

app.listen(5000, ()=>{
    console.log("Server running in port 5000")
})