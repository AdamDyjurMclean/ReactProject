const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoritiesSchema = new Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: String, required: true },
}, {
  timestamps: true,
});

const Favorities = mongoose.model('Favorite', favoritiesSchema);

module.exports = Favorities;