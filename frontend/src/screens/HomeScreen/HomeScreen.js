import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../../components/NavBar'; // Import the NavBar component
import { useAuth } from '../../context/AuthContext'; // Import the AuthContext
import './HomeScreen.css'; // Import the CSS file

function HomeScreen() {
  const [categories, setCategories] = useState({});
  const [randomMovie, setRandomMovie] = useState(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');
  const { token } = useAuth();
  const userId = 7;

  const fetchMovies = useCallback((searchResults = null) => {
    const url = searchResults
      ? `http://localhost:8080/movies/search/${searchResults}`
      : `http://localhost:8080/movies?userId=${userId}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (searchResults !== null) {
          if (data.length === 0) {
            setSearchMessage('No movies found for the search term.');
            setCategories({});
            setRandomMovie(null);
          } else {
            setSearchMessage('');
            setCategories({ 'Search Results': data });
            setRandomMovie(data[Math.floor(Math.random() * data.length)]);
          }
        } else {
          setCategories(data);
          const allMovies = Object.values(data).flat();
          setRandomMovie(allMovies[Math.floor(Math.random() * allMovies.length)]);
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setError(error.message);
      });
  }, [token, userId]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = (searchResults) => {
    fetchMovies(searchResults);
  };

  const handleMouseEnter = (movieId) => {
    setPreview(movieId);
  };

  const handleMouseLeave = () => {
    setPreview(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-screen">
      <NavBar onSearch={handleSearch} /> {/* Include the NavBar component */}
      {searchMessage && (
        <div className="search-message-container">
          <div className="search-message">{searchMessage}</div>
        </div>
      )}
      {randomMovie && (
        <div className="banner" style={{ backgroundImage: `url(${randomMovie.poster})` }}>
          <div className="banner-contents">
            <h1 className="banner-title">{randomMovie.name}</h1>
            <div className="banner-buttons">
              <button className="banner-button">Play</button>
              <button className="banner-button">My List</button>
            </div>
            <p className="banner-description">{randomMovie.description}</p>
          </div>
        </div>
      )}
      {Object.keys(categories).map(category => (
        categories[category].length > 0 && (
          <div key={category} className="category">
            <h2 className="category-title">{category}</h2>
            <div className="category-row">
              {categories[category].map(movie => (
                <div key={movie._id} className="movie-item">
                  <div
                    className="thumbnail-container"
                    onMouseEnter={() => handleMouseEnter(movie._id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${movie.trailer.split('v=')[1]}/0.jpg`}
                      alt={`${movie.name} thumbnail`}
                      className="thumbnail"
                    />
                    {preview === movie._id && (
                      <div className="preview">
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${movie.trailer.split('v=')[1]}?autoplay=1&mute=1`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="video preview"
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}

export default HomeScreen;