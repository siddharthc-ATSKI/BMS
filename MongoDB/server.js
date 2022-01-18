const mongoose=require('mongoose');

const URL='mongodb+srv://aniket:aniket@cluster0.9fnws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoDB= async()=>{
    await mongoose.connect(URL);
    console.log('Server Connected');
}
module.exports=mongoDB;