const router = require('express').Router();
let Other = require('../models/other.model');

router.route('/').get((req, res) => {
    Other.find()
    .then(others => res.json(others))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userEmail = req.body.userEmail;
  const name = req.body.name;
  const songName = req.body.songName;
  const newOther = new Other({userEmail, name, songName});
  newOther.save()
    .then(() => res.json('Other added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Other.findByIdAndDelete(req.params.id)
      .then(() => res.json('Other deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;