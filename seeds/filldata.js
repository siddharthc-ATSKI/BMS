const mongoose=require('mongoose');
const movieSchema=require('../models/movie');
const data=require('./rapidapi');
const mongoDB=require('../MongoDB/server');

mongoDB();

const seedDB= async ()=>{



    await movieSchema.deleteMany({});
    for(let m of data){
        const movie=new movieSchema({
            Title:`${m.title}`,
           
            details:`${m.synopsis}`,
            Poster:`${m.imageurl[0]}`,
            imdbid:`${m.imdbid}`,
            imdbRating:`${m.imdbrating}`,
            genre:`${m.genre}`
        })
        await movie.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});