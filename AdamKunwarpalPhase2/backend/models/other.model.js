const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const othersSchema = new Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  songName: { type: String, required: true },
}, {
  timestamps: true,
});

const Other = mongoose.model('Other', othersSchema);

module.exports = Other;