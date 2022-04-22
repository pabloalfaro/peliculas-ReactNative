import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '6aa1aa87c9c50d71f019f1229ec8db7a',
    language: 'es-ES',
  },
});

export default movieDB;
