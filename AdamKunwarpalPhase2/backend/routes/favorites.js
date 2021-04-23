const router = require('express').Router();
let Favorite = require('../models/favorites.model');

router.route('/').get((req, res) => {
    Favorite.find()
    .then(favorites => res.json(favorites))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userEmail = req.body.userEmail;
  const name = req.body.name;
  const artist = req.body.artist;
  const year = req.body.year;
  const newFavorite = new Favorite({userEmail, name, artist, year});
  newFavorite.save()
    .then(() => res.json('Favorite added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Favorite.findByIdAndDelete(req.params.id)
      .then(() => res.json('Favorite deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;