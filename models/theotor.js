const mongoose = require("mongoose");

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


module.exports=mongoose.model('Theotors',theotorSchema);