const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./db/models/movie');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const connect = async() => {
  await mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/favorite', async(req, res) => {
  const favorites = await Movie.find();
  res.status(200).json({message: 'good', favorites})

})

app.post('/favorite', async(req, res) => {
  const favorite = req.body.favorite;
  const data = { title: favorite.Title, year: favorite.Year, genre: favorite.Genre, plot: favorite.Plot};
  //console.log(data); 
  if (await Movie.exists(data.title)) {
    throw Error('the movie already added to the favorite')
    res.status(500).json({message:'already existed'});
  }
  
  await Movie.create(data);
  const findAllMovies = await Movie.find()
  res.status(200).json({message: 'add to favorite', findAllMovies })
    
})

app.delete('/favorite/:movieId', async(req, res) => {
  console.log(req.body);
  const remove = await Movie.findByIdAndDelete(req.params.movieId);
  res.status(200).json({message: 'deleted successful', remove})
})



app.post('/search', async(req, res) => {
    const title = req.body.searchInput;
  try {
    const movie = await Movie.searchName(title);
    res.status(200).json(movie);
  } catch (error){
      res.status(400).json({message: error.message})
  }
})


const seed = async() => {
  await connect();
  await Movie.collection.drop();
  await Movie.create( {
    title: 'hello',
    year: 2019,
    genre:'funny',
    plot: 'hello world'
  })
}

seed();

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});





