import React, {useState} from 'react';
import Favorite from './components/favorite';
import Search from './components/search'; 


function App() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movie, setMovie] = useState(null);

  const fetchFavoriteMovies = async() => {
    const res = await fetch('/favorite', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await res.json();
    setFavoriteMovies(data.favorite); 
  }

  return (
    <div className="App">
     <Search fetchFavoriteMovies={fetchFavoriteMovies} movie={movie} setMovie={setMovie}/>
     <Favorite favoriteMovies={favoriteMovies} fetchFavoriteMovies={fetchFavoriteMovies} />
    </div>
  );
}

export default App;
