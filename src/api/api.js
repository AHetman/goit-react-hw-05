import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const end_point_trending = "/trending/movie/day";
const end_point_search = "/search/movie?query=";
const end_point_movieDetails = "/movie/";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWVhYTZlN2Y1NGUyNDY0NzgxMjE4YThlZmFjY2I3MSIsInN1YiI6IjY2MWFkYzBiOTgyZjc0MDE2MzQ2YjU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hfi8ZXTV7iyfb2Hml69anbdXeFt_i6nQIqtpbo5y9AM",
  },
};

export const fetchTrendingMovies = async () => {
  const responce = await axios.get(`${BASE_URL}${end_point_trending}`, options);
  return responce;
};

export const fetchSearchMovie = async (searchValue) => {
  const responce = await axios.get(
    `${BASE_URL}${end_point_search}${searchValue}`,
    options
  );
  return responce;
};

export const fetchMovieDetails = async (movieId) => {
  const responce = await axios.get(
    `${BASE_URL}${end_point_movieDetails}${movieId}`,
    options
  );
  return responce;
};

export const fetchMovieCast = async (movieId) => {
  const responce = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits`,
    options
  );
  return responce;
};

export const fetchMovieReviews = async (movieId) => {
  const responce = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews`,
    options
  );
  return responce;
};
