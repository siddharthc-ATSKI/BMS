const mongoose = require("mongoose");

const schema = mongoose.Schema;
const showSchema=new schema({
    theotor:{
        type:mongoose.Types.ObjectId,
        ref:'Theotors'
    },
    timeSlot:{
        type:String
    }
})

module.exports=mongoose.model('Shows',showSchema);