const mongoose=require('mongoose')
const bcrypt=require('bcrypt')


const farmSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        select:false,
        required:true,
        validate:{
            validator:function(value){
                return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message:'Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character (@$!%*?&).'
        }
    },
    cropname:[
        {
            cropname:{type:String,required:true,default:null},
            croplife:{type:String,required:false},    
        }
    ]
    
})

farmSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }else{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt)
        next()
    }
})

farmSchema.methods.comparepassword=async function(pass){
    try{
        // console.log(pass)
         console.log(this.password)
          return await bcrypt.compare(pass,this.password)
    }catch(error){
         console.log('error in compare password',error)
         return false
    }
}

const Users= mongoose.model('Users',farmSchema);



module.exports=Users;