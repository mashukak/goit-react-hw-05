import axios from "axios";

const API_KEY = "0561a8b7afd658e19e151d098f2194ba";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTYxYThiN2FmZDY1OGUxOWUxNTFkMDk4ZjIxOTRiYSIsIm5iZiI6MTczODg2NzQ0MS45NTgwMDAyLCJzdWIiOiI2N2E1MDJmMWYxOTZhNzNhZTc2NmY0NGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.j645wt8YD2r_bQKOu7AfEULxZ-2YunA_p189yj-A-E0";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};


export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};


export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.error("Error searching for movies:", error);
    return [];
  }
};


export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};


export const fetchMovieCast = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits`,
      options
    );
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    return [];
  }
};


export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return [];
  }
};
