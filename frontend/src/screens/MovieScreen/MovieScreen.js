import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './MovieScreen.css'; // Import the CSS file

const MovieScreen = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const { token } = useAuth();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/movies/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [id, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-screen">
      <div className="movie-banner" style={{ backgroundImage: `url(${movie.poster})` }}>
        <div className="movie-banner-contents">
          <h1 className="movie-title">{movie.name}</h1>
          <p className="movie-description">{movie.description}</p>
          <div className="movie-buttons">
            <button className="movie-button">Play</button>
            <button className="movie-button">Add to My List</button>
          </div>
        </div>
      </div>
      <div className="movie-details">
        <h2>Details</h2>
        <p><strong>Release Date:</strong> {movie.releaseDate}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Duration:</strong> {movie.duration}</p>
      </div>
    </div>
  );
};

export default MovieScreen;