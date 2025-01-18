import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './ManagementScreen.css';

function ManagementScreen() {
  const { token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newMovie, setNewMovie] = useState({ name: '', genre: '',filename: '' });
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/movies/all').then(response => setMovies(response.data));
    axios.get('http://localhost:8080/categories').then(response => setCategories(response.data));
  }, []);

  const handleAddMovie = () => {
    axios.post('http://localhost:8080/movies', newMovie, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        name: newMovie.name,
        genre: newMovie.genre,
        filename: newMovie.filename
      }
    }).then(response => {
      setMovies([...movies, response.data]);
      setNewMovie({ title: '', category: '', videoUrl: '' });
    });
  };

  const handleDeleteMovie = (id) => {
    axios.delete(`http://localhost:8080/movies/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(() => {
      setMovies(movies.filter(movie => movie.id !== id));
    });
  };

  return (
    <div className="management-screen">
      <h1>Management Screen</h1>
  
      <section>
        <h2>Categories</h2>
        <div className="category-list">
          {categories.map(category => (
            <div key={category.id} className="category-item">
              <p>{category.name}</p>
              <button>Delete</button>
            </div>
          ))}
        </div>
        <div>
          <h3>Add New Category</h3>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          <button>Add Category</button>
        </div>
      </section>
  
      <section>
        <h2>Movies</h2>
        <div className="movie-list">
          {movies.map(movie => (
            <div key={movie.id} className="movie-item">
              <p>{movie.name}</p>
              <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={handleAddMovie}> 
            <h3>Add New Movie</h3>
            <input
              type="text"
              placeholder="Title"
              value={newMovie.name}
              onChange={e => setNewMovie({ ...newMovie, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Genre"
              value={newMovie.genre}
              onChange={e => setNewMovie({ ...newMovie, genre: e.target.value })}
            />
            <input
              type="text"
              placeholder="File name"
              value={newMovie.filename}
              onChange={e => setNewMovie({ ...newMovie, filename: e.target.value })}
            />
            <button type="submit">Add Movie</button>
          </form>
        </div>
      </section>
    </div>
  );
  
}

export default ManagementScreen;
