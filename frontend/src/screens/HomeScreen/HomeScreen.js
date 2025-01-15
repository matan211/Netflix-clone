import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar'; // Import the NavBar component
import './HomeScreen.css'; // Import the CSS file

function HomeScreen() {
  const [categories, setCategories] = useState({});
  const [randomMovie, setRandomMovie] = useState(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');
  const userId = 7;

  useEffect(() => {
    fetchMovies();
  }, [userId]);

  const fetchMovies = (searchResults = null) => {
    if (searchResults !== null) {
      if (searchResults.length === 0) {
        setSearchMessage('No movies found for the search term.');
        setCategories({});
        setRandomMovie(null);
      } else {
        setSearchMessage('');
        setCategories({ 'Search Results': searchResults });
        const allMovies = searchResults;
        setRandomMovie(allMovies[Math.floor(Math.random() * allMovies.length)]);
      }
      return;
    }

    fetch(`http://localhost:8080/movies?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCategories(data);
        const allMovies = Object.values(data).flat();
        setRandomMovie(allMovies[Math.floor(Math.random() * allMovies.length)]);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setError(error.message);
      });
  };

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
      {searchMessage && <div className="search-message">{searchMessage}</div>}
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