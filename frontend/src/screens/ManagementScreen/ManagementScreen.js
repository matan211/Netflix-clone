import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './ManagementScreen.css';
import NavBar from '../../components/NavBar'; // Import the NavBar component

function ManagementScreen() {
  const { token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newMovie, setNewMovie] = useState({
    name: '', year: 2025, director: '', genre: '', rating: '', description: '',
    poster: '', trailer: '', filename: ''
  });
  const [newCategory, setNewCategory] = useState({ name: '', promoted: 'true' });
  const [editMovieId, setEditMovieId] = useState(null); // Track the movie being edited
  const [editCategoryId, setEditCategoryId] = useState(null); // Track the category being edited

  useEffect(() => {
    axios.get('http://localhost:8080/movies/all').then(response => setMovies(response.data));
    axios.get('http://localhost:8080/categories').then(response => setCategories(response.data));
  }, []);

  const handleDeleteCategory = (id) => {
    axios.delete(`http://localhost:8080/categories/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(() => {
      console.log(categories)
      setCategories(categories.filter(category => category._id !== id));
    });
  }
  
  const handleAddOrEditMovie = async (e) => {
    e.preventDefault();
    try{
      if (editMovieId) {
        // Update existing movie
        axios.put(`http://localhost:8080/movies/${editMovieId}`, newMovie, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }).then(response => {
          console.log(response);
          setMovies(movies.map(movie => movie._id === editMovieId ? response.data : movie));
          setEditMovieId(null);
          resetNewMovieForm();
        });
      } else {
        // Add new movie
        const response = await axios.post('http://localhost:8080/movies', newMovie, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
          console.log(response);
          setMovies([...movies, response.data.movie]);
          resetNewMovieForm();
      }
    } catch(error) {
      console.error('Error adding or editing movie:', error);
      alert('name, genre and File name are required');
    }
  };

  const handleDeleteMovie = (id) => {
    axios.delete(`http://localhost:8080/movies/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(() => {
      setMovies(movies.filter(movie => movie._id !== id));
    });
  };

  const handleAddOrEditCategory = async (e) => {
    e.preventDefault();
    try {
      if (editCategoryId) {
        // Update existing category
        const response = await axios.patch(`http://localhost:8080/categories/${editCategoryId}`, newCategory, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        setCategories(categories.map(category => category._id === editCategoryId ? response.data.updatedCategory : category));
        setEditCategoryId(null);
        resetNewCategoryForm();
      } else {
        // Add new category
        const response = await axios.post('http://localhost:8080/categories', newCategory, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        setCategories([...categories, response.data]);
        resetNewCategoryForm();
      }
    } catch (error) {
      console.error('Error adding or editing category:', error);
      alert("Error editing/adding movie");
    }
  };

  const handleEditMovie = (movie) => {
    console.log(movie)
    setNewMovie(movie);
    setEditMovieId(movie._id);
  };

  const handleEditCategory = (category) => {
    setNewCategory(category);
    setEditCategoryId(category._id);
  };

  const resetNewMovieForm = () => {
    setNewMovie({
      name: '', year: 2025, director: '', genre: '', rating: '', description: '',
      poster: '', trailer: '', filename: ''
    });
  };

  const resetNewCategoryForm = () => {
    setNewCategory({ name: '', promoted: 'true' });
  };

  return (
    <div className="management-screen">
      <div className='nav-bar'>
        <NavBar />
      </div>
      <div>
        <h1>Management Screen</h1>
        <section>
          <h2>Categories</h2>
          <div className="category-list">
            {categories.map(category => (
              <div key={category._id} className="category-item">
                <p>{category.name}</p>
                <button onClick={() => handleEditCategory(category)}>Edit</button>
                <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={handleAddOrEditCategory}>
              <h3>{editCategoryId ? 'Edit Category' : 'Add New Category'}</h3>
              <input
                type="text"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              <label for="isPromoted">
                Promoted:
                <select name='isPromoted' onChange={e => { setNewCategory({ ...newCategory, promoted: e.target.value }) }}>
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
              </label>
              <button type='submit'>{editCategoryId ? 'Update Category' : 'Add Category'}</button>
            </form>
          </div>
        </section>

        <section>
          <h2>Movies</h2>
          <div className="movie-list">
            {movies.map(movie => (
              <div key={movie._id} className="movie-item">
                {console.log(movie)}
                <p>{movie.name}</p>
                <button onClick={() => handleEditMovie(movie)}>Edit</button>
                <button onClick={() => handleDeleteMovie(movie._id)}>Delete</button>
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={handleAddOrEditMovie}>
              <h3>{editMovieId ? 'Edit Movie' : 'Add New Movie'}</h3>
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
              <label htmlFor="year-dropdown">
                Year Released:
                <select name="year-dropdown">
                  {Array.from({ length: 2025 - 1900 + 1 }, (_, index) => {
                    const year = 1900 + index;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </label>
              <input
                type="text"
                placeholder="Director"
                value={newMovie.director}
                onChange={e => setNewMovie({ ...newMovie, director: e.target.value })}
              />
              <label htmlFor="rating-dropdown">
                Rating:
                <select name="rating-dropdown">
                  {Array.from({ length: 10 - 1 + 1 }, (_, index) => {
                    const rating = 1 + index;
                    return <option key={rating} value={rating}>{rating}</option>;
                  })}
                </select>
              </label>
              <input
                type="text"
                placeholder="Description"
                value={newMovie.description}
                onChange={e => setNewMovie({ ...newMovie, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Poster"
                value={newMovie.poster}
                onChange={e => setNewMovie({ ...newMovie, poster: e.target.value })}
              />
              <input
                type="text"
                placeholder="Trailer"
                value={newMovie.trailer}
                onChange={e => setNewMovie({ ...newMovie, trailer: e.target.value })}
              />
              <input
                type="number"
                placeholder="Length"
                value={newMovie.length}
                onChange={e => setNewMovie({ ...newMovie, length: e.target.value })}
              />
              <input
                type="number"
                placeholder="Age Restriction"
                value={newMovie.ageRestriction}
                onChange={e => setNewMovie({ ...newMovie, ageRestriction: e.target.value })}
              />
              {/* Other inputs for movie fields */}
              <button type="submit">{editMovieId ? 'Update Movie' : 'Add Movie'}</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ManagementScreen;
