const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
}, {
  timestamps: true,
});

const List = mongoose.model('List', listSchema);

module.exports = List;