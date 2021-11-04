const Character = require('../models/character.js');

module.exports.getAllCharacters = async (req, res) => {
  try {
    let allCharacters = await Character.find({});
    res.json({status: 'success', data: allCharacters});
  }
  catch(err) {
    res.json({status: 'error', message: err});
  }
};

module.exports.newCharacter = (req, res) => {
  try {
    let { name, actor } = req.body;
    let { url, secure_url } = res.locals.avatar;

    let newUser = new Character({
      name: name,
      actor: actor,
      avatar: {
        url: url,
        secure_url: secure_url
      }
    }).save();
    
    res.json({status: 'success', message: 'character saved to db', user: newUser});
  }
  catch(err) {
    res.json({status: 'error controller', message: err});
  }
};

module.exports.voteCharacter = async (req, res) => {
  try {
    let { id } = req.query;
    let characterToVote = await Character.findOne({_id: id});
    let votesPlusOne = characterToVote.votes + 1;
    await Character.updateOne({_id: id}, {votes: votesPlusOne});
    res.json({status: 'success', message: 'Characted voted!'});
  }
  catch(err) {
    res.json({status: 'error', message: err});
  }
};

module.exports.getWinners = async (req, res) => {
  try {
    let winners = await Character.find({votes: {$gte: 1}}).sort({votes : -1}).limit(3);
    res.json({
      status: 'success',
      data: winners
    });
  }
  catch(err) {
    res.json({status: 'error', message: err});
  }
}