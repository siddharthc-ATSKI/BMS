const mongoose=require('mongoose');
const scheam=mongoose.Schema;
// const passportLocalMongoose=require('passport-local-mongoose');


const userSchema=new scheam({
    username:{
        type:String,
        required:true,
        unique:true

    },
    mobilenumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
// userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Users',userSchema);