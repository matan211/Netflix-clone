import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './MovieScreen.css'; // Import the CSS file

const MovieScreen = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const { token, userId } = useAuth(); // Get token and userId from AuthContext
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

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

        // Get recommended movies
        const responseRecommended = await fetch(`http://localhost:8080/movies/${id}/recommend?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!responseRecommended.ok) {
          throw new Error(`HTTP error! status: ${responseRecommended.status}`);
        }

        // Return as 
        const dataRecommended = await responseRecommended.text();
        // Remove the " " in the
        console.log(dataRecommended);
        const recommendedMovieIds = dataRecommended.split(' ');
        console.log(recommendedMovieIds);

        // Fetch details for each recommended movie
        const recommendedMoviesDetails = await Promise.all(
          recommendedMovieIds.map(async (movieId) => {
            const response = await fetch(`http://localhost:8080/movies/${movieId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();
          })
        );

        setRecommendedMovies(recommendedMoviesDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [id, token, userId]);

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
        <p><strong>Release Date:</strong> {movie.year}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Duration:</strong> {movie.length} minutes</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Age Restriction:</strong> {movie.ageRestriction}+</p>
      </div>
      <div className="movie-player">
        <video controls width="100%">
          <source src={`http://localhost:8080/video/${movie.filename}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="recommended-movies">
        <h2>Recommended Movies</h2>
        <div className="recommended-movies-list">
          {recommendedMovies.map((recommendedMovie) => (
            <div key={recommendedMovie._id} className="recommended-movie-item">
              <img src={recommendedMovie.poster} alt={recommendedMovie.name} />
              <p>{recommendedMovie.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieScreen;