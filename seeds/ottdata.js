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
    type: 'show',
    sort: 'latest',
    page: '1'
  },
  headers: {
    'x-rapidapi-host': 'ott-details.p.rapidapi.com',
    'x-rapidapi-key': 'f5e170df5cmshcc9b230d5f0dce9p193c0bjsn8235bc8bba90'
  }
};
// const collectdata= ()=>{
  
// }
// console.log(collectdata());
// module.exports=collectdata();

//   request(options,{json:true},(a,b,data)=>{
//       console.log(data);
//   })

  