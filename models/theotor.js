const mongoose = require("mongoose");
const passportLocalMongoose=require('passport-local-mongoose');
const schema = mongoose.Schema;

const theotorSchema= new schema({
    name:{
        type:String,
        required:true
    },
  location:{
      type:String,
      required:true
  }  ,
  numberOfScreens:{
      type:Number
  },
  review:[{
      type:mongoose.Types.ObjectId,
      ref:'Review'
    }
  ],
  MovieHistory:[{
      type:mongoose.Types.ObjectId,
      ref:"MovieSchema"
  }],
  opened:{
      type:String
  },
  Owner:{
      type:String
  },
  Phone:{
      type:String
  },
  rating:{
      type:String
  }
})

// theotorSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Theotors',theotorSchema);