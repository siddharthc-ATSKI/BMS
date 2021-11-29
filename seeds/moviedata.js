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
      type: 'movie',
      sort: 'latest',
      page: '4'
    },
    headers: {
      'x-rapidapi-host': process.env.x_rapid_api_host ,
      'x-rapidapi-key': process.env.x_rapid_api_key
    }
  };