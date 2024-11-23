import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import MovieDetails from "./../src/components/MovieDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
};

export default App;
