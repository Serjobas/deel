import axios from 'axios';
import { Movie, MovieAPI } from './types';

function mapMovie(movie: MovieAPI): Movie {
  return {
    id: movie.imdbID,
    title: movie.Title,
  };
}

export const getMovies = (query: string): Promise<Movie[]> => {
  return axios
    .get<{ Search: MovieAPI[] }>(`http://www.omdbapi.com/?apikey=f607ffe7&s=${query}`)
    .then((d) => {
      return d.data?.Search?.map(mapMovie) || [];
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
};
