const Character = require('../models/character.js');

module.exports.getAllCharacters = async (req, res) => {
  try {
    let allCharacters = await Character.find({});
    res.send({status: 'success', data: allCharacters});
  }
  catch(err) {
    throw new Error(err);
  }
};

module.exports.newCharacter = (req, res) => {
  try {
    let { name, actor } = req.body;
    let { url, secure_url } = res.locals.avatar;

    new Character({
      name: name,
      actor: actor,
      avatar: {
        url: url,
        secure_url: secure_url
      }
    }).save(err => {
      if (!err) {
        res.send({status: 'success', message: 'Characted saved to db.'});
      }
    });
  }
  catch(err) {
    throw new Error(err);
  }
};

module.exports.voteCharacter = async (req, res) => {
  try {
    let { id } = req.query;
    let characterToVote = await Character.findOne({_id: id});
    let votesPlusOne = characterToVote.votes + 1;
    await Character.updateOne({_id: id}, {votes: votesPlusOne});
    res.send({status: 'success', message: 'Characted voted!'});
  }
  catch(err) {
    throw new Error(err);
  }
};

module.exports.getWinners = async (req, res) => {
  try {
    let winners = await Character.find({votes: {$gte: 1}}).sort({votes : -1}).limit(3);
    res.send({
      status: 'success',
      data: winners
    });
  }
  catch(err) {
    throw new Error(err);
  }
}