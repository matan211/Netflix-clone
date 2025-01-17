import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './MovieScreen.css'; // Import the CSS file

const MovieScreen = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const { token, userId } = useAuth(); // Get token and userId from AuthContext
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
<<<<<<< HEAD
  const navigate = useNavigate();

  const handleOtherMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };
=======
>>>>>>> 6bc570a1fd3b168efa022ed7a0ce8755a553b672

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

<<<<<<< HEAD
        // Return as string with " " at the ends
        const dataRecommended = await responseRecommended.text();
        // Cut the " " and split by spaces
        const recommendedMovieIds = dataRecommended.slice(1, -1).split(' ');
=======
        // Return as 
        const dataRecommended = await responseRecommended.text();
        // Remove the " " in the
        console.log(dataRecommended);
        const recommendedMovieIds = dataRecommended.split(' ');
        console.log(recommendedMovieIds);
>>>>>>> 6bc570a1fd3b168efa022ed7a0ce8755a553b672

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
      <div className="movie-details">
        <h2>Details</h2>
<<<<<<< HEAD
        {console.log(movie)}
=======
>>>>>>> 6bc570a1fd3b168efa022ed7a0ce8755a553b672
        <p><strong>Release Date:</strong> {movie.year}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Duration:</strong> {movie.length} minutes</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Age Restriction:</strong> {movie.ageRestriction}+</p>
      </div>
      <div className="movie-player">
<<<<<<< HEAD
        <video key={movie.filename} controls width="100%">
=======
        <video controls width="100%">
>>>>>>> 6bc570a1fd3b168efa022ed7a0ce8755a553b672
          <source src={`http://localhost:8080/video/${movie.filename}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="recommended-movies">
        <h2>Recommended Movies</h2>
        <div className="recommended-movies-list">
          {recommendedMovies.map((recommendedMovie) => (
            <div key={recommendedMovie._id} className="recommended-movie-item">
<<<<<<< HEAD
              {console.log(recommendedMovie.name)}
              <p>{recommendedMovie.name}</p>
              <button onClick={() => handleOtherMovieClick(recommendedMovie._id)}>Other Movie</button>
=======
              <img src={recommendedMovie.poster} alt={recommendedMovie.name} />
              <p>{recommendedMovie.name}</p>
>>>>>>> 6bc570a1fd3b168efa022ed7a0ce8755a553b672
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieScreen;