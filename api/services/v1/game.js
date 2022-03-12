const Game = require('../../models/game');

exports.getAll = async (req, res, next) => {
  try {
    let games = await Game.find();
    return games ? res.status(200).json(games) : res.status(404).json('game_not_found');
  } catch (error) {
    return res.status(501).json(error);
  }
}

exports.getById = async (req, res, next) => {
  try {
    let game = await Game.findById(req.params.id);
    return game ? res.status(200).json(game) : res.status(404).json('game_not_found');
  } catch (error) {
    return res.status(501).json(error);
  }
}

exports.add = async (req, res, next) => {
  Object.keys(req.body).forEach((key) => (req.body[key] == null) && delete req.body[key]);
  if(req?.file?.path)
    req.body['miniature'] = '/'+req.file.path;
  console.log(req.body);
  try {
    let game = await Game.create(req.body);
    return res.status(201).json(game);
  } catch (error) {
    return res.status(501).json(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    let game = await Game.findOne({ _id: req.params.id });
    if (game) {
      Object.keys(req.body)
        .filter(key => !!req.body[key])
        .forEach(key => game[key] = req.body[key]);
      await game.save();
      return res.status(201).json(game);
    }
    return res.status(404).json('game_not_found');
  } catch (error) {
    return res.status(501).json(error);
  }
}

exports.delete = async (req, res, next) => {
  try {
    await Game.deleteOne({ _id: req.params.id });
    return res.status(204).json('delete_ok');
  } catch (error) {
    return res.status(501).json(error);
  }
}