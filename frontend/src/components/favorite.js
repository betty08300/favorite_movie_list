import React, { useState, useEffect} from 'react';
import FavoriteItem from './favoriteItem';

const Favorite = ({favoriteMovies, fetchFavoriteMovies}) => {


  useEffect(()=> {
    fetchFavoriteMovies()
  }, []); 

  

  const favoriteItems = favoriteMovies.map((favoriteMovie, index) => {
    const handleRemove = async() =>{
      let resp = await fetch(`/favorite/${favoriteMovie._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
       
      })
      let data = await resp.json();
      console.log(resp.status)
      await fetchFavoriteMovies(); 
      //console.log("deleteMovie", data.remove);
    }
    return <FavoriteItem favoriteMovie={favoriteMovie} key={index} handleRemove={handleRemove}/>
  })

  return(
    <div>
      {favoriteItems}
    </div>
  )
}

export default Favorite ; 