const mongoose=require('mongoose');

const mongoDB= async()=>{
    await mongoose.connect(process.env.URL);
    console.log('Server Connected');
}
module.exports=mongoDB;