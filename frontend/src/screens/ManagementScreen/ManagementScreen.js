import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './ManagementScreen.css';
import NavBar from '../../components/NavBar'; // Import the NavBar component

function ManagementScreen() {
  const { token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newMovie, setNewMovie] = useState({ name: '', year: 2025, director: '', genre: '', rating: '', description: '',
    poster: '', trailer: '', filename: '' });
  const [newCategory, setNewCategory] = useState({name: '', promoted: 'true'});

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
      setNewMovie({ name: '', year: 2025, director: '', genre: '', rating: '', description: '',
        poster: '', trailer: '', filename: '' });
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

  const handleAddCategory = () => {
    axios.post('http://localhost:8080/categories', newCategory, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: {
        name: newCategory.name,
        promoted: newCategory.promoted
      }
  }).then(response => {
    console.log(response.data)
    setCategories([...categories, response.data]);
    setNewCategory({name: '', promoted: 'true'});
  });
};

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

  return (
    <div className="management-screen">
      <div className='nav-bar'>
        <NavBar/>
      </div>
      <div>
        <h1>Management Screen</h1>
        <section>
          <h2>Categories</h2>
          <div className="category-list">
            {categories.map(category => (
              <div key={category._id} className="category-item">
                <p>{category.name}</p>
                <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={handleAddCategory}>
              <h3>Add New Category</h3>
              <input
                type="text"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={e => setNewCategory({...newCategory, name: e.target.value})}
              />
            <select name='isPromoted' onChange={e => {setNewCategory({...newCategory, promoted: e.target.value});
                                                        console.log(newCategory)
            }}>
              <option value='true'>Yes</option>
              <option value='false'>No</option> 
            </select>
              <button type='submit'>Add Category</button>
            </form>
          </div>
        </section>
    
        <section>
          <h2>Movies</h2>
          <div className="movie-list">
            {movies.map(movie => (
              <div key={movie._id} className="movie-item">
                <p>{movie.name}</p>
                <button onClick={() => handleDeleteMovie(movie._id)}>Delete</button>
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
              <label for="dob-year">
                Release year: 
                <select name="dob-year" class="datefield year" onChange={e => {setNewMovie({...newMovie, year: e.target.value})}}>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1994">1994</option>
                  <option value="1993">1993</option>
                  <option value="1992">1992</option>
                  <option value="1991">1991</option>
                  <option value="1990">1990</option>
                  <option value="1989">1989</option>
                  <option value="1988">1988</option>
                  <option value="1987">1987</option>
                  <option value="1986">1986</option>
                  <option value="1985">1985</option>
                  <option value="1984">1984</option>
                  <option value="1983">1983</option>
                  <option value="1982">1982</option>
                  <option value="1981">1981</option>
                  <option value="1980">1980</option>
                  <option value="1979">1979</option>
                  <option value="1978">1978</option>
                  <option value="1977">1977</option>
                  <option value="1976">1976</option>
                  <option value="1975">1975</option>
                  <option value="1974">1974</option>
                  <option value="1973">1973</option>
                  <option value="1972">1972</option>
                  <option value="1971">1971</option>
                  <option value="1970">1970</option>
                  <option value="1969">1969</option>
                  <option value="1968">1968</option>
                  <option value="1967">1967</option>
                  <option value="1966">1966</option>
                  <option value="1965">1965</option>
                  <option value="1964">1964</option>
                  <option value="1963">1963</option>
                  <option value="1962">1962</option>
                  <option value="1961">1961</option>
                  <option value="1960">1960</option>
                  <option value="1959">1959</option>
                  <option value="1958">1958</option>
                  <option value="1957">1957</option>
                  <option value="1956">1956</option>
                  <option value="1955">1955</option>
                  <option value="1954">1954</option>
                  <option value="1953">1953</option>
                  <option value="1952">1952</option>
                  <option value="1951">1951</option>
                  <option value="1950">1950</option>
                  <option value="1949">1949</option>
                  <option value="1948">1948</option>
                  <option value="1947">1947</option>
                  <option value="1946">1946</option>
                  <option value="1945">1945</option>
                  <option value="1944">1944</option>
                  <option value="1943">1943</option>
                  <option value="1942">1942</option>
                  <option value="1941">1941</option>
                  <option value="1940">1940</option>
                  <option value="1939">1939</option>
                  <option value="1938">1938</option>
                  <option value="1937">1937</option>
                  <option value="1936">1936</option>
                  <option value="1935">1935</option>
                  <option value="1934">1934</option>
                  <option value="1933">1933</option>
                  <option value="1932">1932</option>
                  <option value="1931">1931</option>
                  <option value="1930">1930</option>
                  <option value="1929">1929</option>
                  <option value="1928">1928</option>
                  <option value="1927">1927</option>
                  <option value="1926">1926</option>
                  <option value="1925">1925</option>
                  <option value="1924">1924</option>
                  <option value="1923">1923</option>
                  <option value="1922">1922</option>
                  <option value="1921">1921</option>
                  <option value="1920">1920</option>
                  <option value="1919">1919</option>
                  <option value="1918">1918</option>
                  <option value="1917">1917</option>
                  <option value="1916">1916</option>
                  <option value="1915">1915</option>
                  <option value="1914">1914</option>
                  <option value="1913">1913</option>
                  <option value="1912">1912</option>
                  <option value="1911">1911</option>
                  <option value="1910">1910</option>
                  <option value="1909">1909</option>
                  <option value="1908">1908</option>
                  <option value="1907">1907</option>
                  <option value="1906">1906</option>
                  <option value="1905">1905</option>
                  <option value="1904">1904</option>
                  <option value="1903">1903</option>
                  <option value="1902">1902</option>
                  <option value="1901">1901</option>
                  <option value="1900">1900</option>
                </select>
              </label>
              <input
                type="text"
                placeholder='Director'
                value={newMovie.director}
                onChange={e => setNewMovie({...newMovie, director: e.target.value})}
                />
              <label for="rating">
                Rating:
                <select name="rating" onChange={e => {setNewMovie({...newMovie, rating: e.target.value})}}>
                  <option value="10">10</option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </select>
              </label>
              <input
                type="text"
                placeholder='Description'
                value={newMovie.description}
                onChange={e => setNewMovie({...newMovie, description: e.target.value})}
                />
                <input
                type="text"
                placeholder='Poster URL'
                value={newMovie.poster}
                onChange={e => setNewMovie({...newMovie, poster: e.target.value})}
                />
                <input
                type="text"
                placeholder='Trailer URL'
                value={newMovie.trailer}
                onChange={e => setNewMovie({...newMovie, trailer: e.target.value})}
                />
              <button type="submit">Add Movie</button>
            </form>
          </div>
        </section>
        </div>
    </div>
  );
  
}

export default ManagementScreen;
