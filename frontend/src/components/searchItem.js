import React from 'react';

const SearchItem = ({movie}) => {
  if (movie === null) return null; 
  
  return(
    <div>
     {movie &&
      (<ul>
        <li>Title: {movie.Title}</li>
        <li>Year: {movie.Year}</li>
        <li>Genre: {movie.Genre}</li>
        <li>Plot: {movie.Plot}</li>
      </ul>)
     }
    </div>
  )
}

export default SearchItem ; 