import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { Typography, Container, Grid, Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <Typography>Loading...</Typography>;
  }

  const handleGoBack = () => {
    navigate(-1); // Va hacia atrás en el historial
  };

  return (
    <Box
      sx={{
        padding: "80px",
      }}
    >
      {/* Icono de retroceso */}
      <IconButton onClick={handleGoBack} sx={{ marginBottom: 2 }}>
        <ArrowBackIosIcon sx={{ fontSize: 30 , color: "#ffffff" }} />
      </IconButton>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{
              width: "80%",
              maxHeight: "500px",
              objectFit: "cover",
            }}
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {movie.title}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.4rem" }}>
            {movie.overview}
          </Typography>
          <Typography variant="h6" padding={2}>
            Fecha de lanzamiento: {movie.release_date}
          </Typography>
          <Typography variant="h6" padding={2}>
            Clasificación: {movie.vote_average}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieDetail;
