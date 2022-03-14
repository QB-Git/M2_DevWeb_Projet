const mongoose = require('mongoose');
const Game = require('../models/game');

const clientOptions = {
  useNewUrlParser: true,
  dbName: 'mygamelist'
};
const docs = [
  {
    'nom': 'Zelda1',
    'status': 'En cours',
    'plateforme': [
      'PC'
    ],
    'support': [
      'Version physique'
    ]
  },
  {
    'nom': 'Zelda2',
    'status': 'En cours',
    'plateforme': [
      'PC'
    ],
    'support': [
      'Version physique'
    ]
  }
];

exports.seed = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO, clientOptions)
    await Game.deleteMany({});
    await Game.insertMany(docs);
    console.log('Connected');
  } catch (error) {
    console.log(error);
    throw error;
  }
}

exports.initClientDbConnection = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO, clientOptions)
    console.log('Connected');
  } catch (error) {
    console.log(error);
    throw error;
  }
}