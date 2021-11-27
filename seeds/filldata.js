const mongoose=require('mongoose');
const movieSchema=require('../models/movie');
const {data}=require('./data');
const mongoDB=require('../MongoDB/server');

mongoDB();

const seedDB= async ()=>{



    await movieSchema.deleteMany({});
    for(let i=0 ;i<=50;i++){
        const movie=new movieSchema({
            Title:`${data[i][i].name}`,
            tags:`${data[i][i].tags}`,
            details:`${data[i][i].details}`,
            Poster:`${data[i][i].image}`
        })
        await movie.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});