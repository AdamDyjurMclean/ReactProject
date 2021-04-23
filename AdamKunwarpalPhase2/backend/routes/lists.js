const router = require('express').Router();
let List = require('../models/list.model');

router.route('/').get((req, res) => {
    List.find()
    .then(lists => res.json(lists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userEmail = req.body.userEmail;
  const name = req.body.name;
  const newList = new List({userEmail, name});
  newList.save()
    .then(() => res.json('List added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    List.findByIdAndDelete(req.params.id)
      .then(() => res.json('List deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;