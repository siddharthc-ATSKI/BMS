const mongoose=require('mongoose');
const movieSchema=require('../models/movie');
const {movies}=require('./data');
const mongoDB=require('../MongoDB/server');

mongoDB();

const seedDB=()=>{



    await movieSchema.deleteMany({});
    for(let i=0 ;i<=200;i++){
        const movie=new movieSchema({
            Title:`${m[i].name}`,
            tags:`${m[i].tags}`,
            details:`${m[i].details}`,
            Poster:`${m[i].image}`
        })
        await movie.save();
    }
}