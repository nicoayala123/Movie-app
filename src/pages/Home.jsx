import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopRatedMovies } from "../services/api";
import {
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { debounce } from "lodash";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTopRatedMovies();
        setMovies(data);
        setFilteredMovies(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching movies.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const debouncedSearch = debounce((term) => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, 300);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  const handleDetailsClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "30px",       
      }}
    >
      {/* Campo de búsqueda mejorado */}
      <TextField
        label="Buscar películas"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{
          marginBottom: "30px",
          borderRadius: "10px",
          backgroundColor: "#333", 
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#333", 
            "& input": {
              color: "#ffffff", 
            },
            "& fieldset": {
              borderColor: "#555", 
            },
            "&:hover fieldset": {
              borderColor: "#fff", 
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00bcd4",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#ffffff", 
          },
          marginX: "auto", 
        }}
      />
      <Typography variant="h3" gutterBottom align="center" sx={{ color: "white" }}>
        Películas mejor valoradas
      </Typography>

      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card
              sx={{
                boxShadow: 3,
                backgroundColor: "transparent",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 10,
                  cursor: "pointer",
                },
              }}
              onClick={() => handleDetailsClick(movie.id)}
            >
              <CardMedia
                component="img"
                height="350"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "60px",
                  padding: "0px 30px",
                }}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{color: "#ffffff"}}>
                  {movie.title}
                </Typography>
                <Typography variant="body1" sx={{color: "#ffffff"}}>
                  Calificación: {movie.vote_average}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
