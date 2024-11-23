import axios from 'axios';

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "8827c1dca05d3eaff13ef274c7887d14";

export const getTopRatedMovies = async () => {
  try {    
    const response = await axios.get(`${API_URL}/movie/top_rated?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error.message);
    throw error;
  }
};


export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
