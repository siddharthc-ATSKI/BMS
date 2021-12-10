const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const scheam=mongoose.Schema;
// const passportLocalMongoose=require('passport-local-mongoose');


const userSchema=new scheam({
    
    mobilenumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
   
})
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Users',userSchema);