const express = require('express');
const Router = express.Router();
const characterCtrl = require('../controllers/character.js');
const multerUpload = require('../middleware/multer.js');
const cloudinaryUpload = require('../middleware/cloudinary.js');

Router.get('/', characterCtrl.getAllCharacters);

Router.post('/new', multerUpload.single('avatar'), cloudinaryUpload, characterCtrl.newCharacter);

Router.get('/vote', characterCtrl.voteCharacter);

Router.get('/winners', characterCtrl.getWinners);

module.exports = Router;