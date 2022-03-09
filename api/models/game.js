const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { listPlateformes, listStatus, listSupports } = require('../const')
const Game = new Schema({
  miniature: {
    type: String,
    trim: true
  },
  nom: {
    type: String,
    trim: true,
    required: [true, 'Le nom est obligatoire'],
    unique: true
  },
  status: {
    type: String,
    enum: listStatus,
    trim: true,
    required: [true, 'Le status est obligatoire']
  },
  note: {
    type: Number,
    enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
  },
  plateforme: {
    type: [String],
    trim: true,
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0 && v.every(e => listPlateformes.includes(e));
      },
      message: props => `${props.value} n'est pas une plateforme valide`
    }
  },
  support: {
    type: [String],
    trim: true,
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0 && v.every(e => listSupports.includes(e));
      },
      message: props => `${props.value} n'est pas un support valide`
    }
  },
  commentaire: {
    type: String,
    trim: true
  },
  favoris: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});

module.exports = mongoose.model('Game', Game);