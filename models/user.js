const mongoose=require('mongoose');
const scheam=mongoose.Schema;
// const passportLocalMongoose=require('passport-local-mongoose');


const userSchema=new scheam({
    username:{
        type:String,
        required:true,
        unique:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})
// userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Users',userSchema);