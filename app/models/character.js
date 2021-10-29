const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  actor: {
    type: String,
    required: true
  },
  avatar: {
    url: {
      type: String,
      required: true
    },
    secure_url: {
      type: String,
      required: true
    }
  },
  votes: {
    type: Number,
    default: 0
  }
});

const Character = mongoose.model('Character', characterSchema);

module.exports= Character;