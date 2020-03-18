const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fetch = require('node-fetch');

const movieSchema = new Schema({
  title: { type: String, required: true }, 
  year: { type: String, required: true },
  genre: { type: String, required: true },
  plot: { type: String, required: true },
  date: { type: Date, default: Date.now },
  
});

movieSchema.statics.searchTitle = async function(title) {
  const url = `http://www.omdbapi.com/?apikey=5ffac00c&t=${title}`;
  const resp = await fetch(url);

  if (resp.status === 200){
    const movie = await resp.json();
    return movie; 
  } else if (resp.status === 404) {
    throw Error('title not found');
  };
}

movieSchema.statics.exists = async function(title) {
  const count = await this.countDocuments({ title });
  console.log(title);
  console.log(count)
  return count > 0;
}


  module.exports = mongoose.model('Movie', movieSchema )