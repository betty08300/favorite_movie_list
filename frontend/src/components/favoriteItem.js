import React, {useState} from 'react';

const FavoriteItem = ({favoriteMovie, handleRemove}) => {
  
  return(
    <div>
      <ul>
        <li>{favoriteMovie.title}</li>
        <li>{favoriteMovie.year}</li>
        <li>{favoriteMovie.genre}</li>
        <li>{favoriteMovie.plot}</li>
      </ul>
      <button onClick={handleRemove}>Delete</button>
    </div>
  )
}

export default FavoriteItem; 