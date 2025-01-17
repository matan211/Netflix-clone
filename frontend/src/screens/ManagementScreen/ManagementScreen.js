import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './ManagementScreen.css';

function ManagementScreen() {
  const { token } = useAuth(); // Get token and userId from AuthContext   
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', category: '', videoUrl: '' });
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Fetch movies and categories from the API
    axios.get('http://localhost:8080/movies/all').then(response => setMovies(response.data));
    axios.get('http://localhost:8080/categories').then(response => setCategories(response.data));
  }, []);

  const handleAddMovie = () => {
    axios.post('http://localhost:8080/movies', newMovie).then(response => {
      setMovies([...movies, response.data]);
      setNewMovie({ title: '', category: '', videoUrl: '' });
    });
  };

  const handleDeleteMovie = (id) => {
    // Send DELETE request to server
    axios.delete(`http://localhost:8080/movies/${id}`, { 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        } })
    // Remove movie from Movies state
    .then(() => {
      setMovies(movies.filter(movie => movie.id !== id));
    });
  };

//   const handleEditMovie = (id, updatedMovie) => {
//     axios.put(`/api/movies/${id}`, updatedMovie).then(response => {
//       setMovies(movies.map(movie => (movie.id === id ? response.data : movie)));
//     });
//   };

//   const handleAddCategory = () => {
//     axios.post('/api/categories', { name: newCategory }).then(response => {
//       setCategories([...categories, response.data]);
//       setNewCategory('');
//     });
//   };

//   const handleDeleteCategory = (id) => {
//     axios.delete(`/api/categories/${id}`).then(() => {
//       setCategories(categories.filter(category => category.id !== id));
//     });
//   };

  return (
    <div>
      <h1>Management Screen</h1>

      <section>
        <h2>Movies</h2>
        {movies.map(movie => (
          <div key={movie.id}>
            <p>{movie.name}</p>
            <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
            {/* TODO: Add an edit form or modal here*/}
          </div>
        ))}
        <div>
          <h3>Add New Movie</h3>
          <input
            type="text"
            placeholder="Title"
            value={newMovie.title}
            onChange={e => setNewMovie({ ...newMovie, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newMovie.category}
            onChange={e => setNewMovie({ ...newMovie, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Video URL"
            value={newMovie.videoUrl}
            onChange={e => setNewMovie({ ...newMovie, videoUrl: e.target.value })}
          />
          <button onClick={handleAddMovie}>Add Movie</button>
        </div>
      </section>

      <section>
        <h2>Categories</h2>
        {categories.map(category => (
          <div key={category.id}>
            <p>{category.name}</p>
            {/* <button onClick={() => handleDeleteCategory(category.id)}>Delete</button> */}
            {/* Add an edit form or modal here */}
          </div>
        ))}
        <div>
          <h3>Add New Category</h3>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          {/* <button onClick={handleAddCategory}>Add Category</button> */}
        </div>
      </section>
    </div>
  );
}

export default ManagementScreen;
