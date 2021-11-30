// const request=require('request');
module.exports = {
  method: 'GET',
  url: 'https://ott-details.p.rapidapi.com/advancedsearch',
  params: {
    start_year: '1970',
    end_year: '2020',
    min_imdb: '6',
    max_imdb: '7.8',
    genre: 'action',
    language: 'english',
<<<<<<< HEAD
    type: 'movie',
    sort: 'latest',
    page: '1'
  },
  headers: {
    'x-rapidapi-host': 'ott-details.p.rapidapi.com',
    'x-rapidapi-key': '7b7e8679c8mshd689823a71c887dp19505fjsnfe7fc3812c2b'
=======
    type: 'show',
    sort: 'latest',
    page: '4'
  },
  headers: {
    'x-rapidapi-host':process.env.x_rapid_api_host ,
    'x-rapidapi-key': process.env.x_rapid_api_key
>>>>>>> atharva_1
  }
};
// const collectdata= ()=>{
  
// }
// console.log(collectdata());
// module.exports=collectdata();

//   request(options,{json:true},(a,b,data)=>{
//       console.log(data);
//   })

  