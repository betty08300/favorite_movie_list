import React, { useState, useEffect} from 'react';
import FavoriteItem from './favoriteItem';

const Favorite = ({favoriteMovies, fetchFavoriteMovies}) => {


  useEffect(()=> {
    fetchFavoriteMovies()
  }, []); 

//   const fetchFavoriteMovies = async() => {
//     const res = await fetch('/favorite', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     const data = await res.json();
//     setFavoriteMovies(data.favorites); 
// }

  // const handleRemove = async(index) =>{
  //   let resp = await fetch('/favorite', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ remove: movie })
  //   })
  //   let data = await resp.json();
  //   setDeleteMovie(data.remove)

  //   console.log("deleteMovie", data.remove);
  // }

  const favoriteItems = favoriteMovies.map((favoriteMovie, index) => {
    const handleRemove = async() =>{
      let resp = await fetch(`/favorite/${favoriteMovie._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ remove: movie })
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