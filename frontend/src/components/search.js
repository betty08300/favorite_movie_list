import React, {useState, useEffect} from 'react';
import SearchItem from './searchItem';

const Search = ({fetchFavoriteMovies, movie, setMovie}) => {

 
  const [searchInput, setSearchInput ] = useState('');
 
  const handleChange = (e) => {
    setSearchInput(e.target.value); 
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(searchInput)
    let resp = await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchInput })
      })
      let movie = await resp.json()
      setMovie(movie);
      setSearchInput('');
      
  }


  const handleClick = async(e) => {
  
    let resp = await fetch('/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ favorite: movie })
    })
    let favoriteMovie = await resp.json();
    console.log(favoriteMovie);
    
    const favoriteMovies = favoriteMovie.findAllMovies;
    await fetchFavoriteMovies(favoriteMovies); 
  }



  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type='text' value={searchInput} onChange={handleChange}></input>
        <button>Search</button>
      </form>
      <button onClick={handleClick}>Favorite</button>
      <div>
        <SearchItem movie={movie}/>
      </div>
    </div>
  )

}

export default Search; 