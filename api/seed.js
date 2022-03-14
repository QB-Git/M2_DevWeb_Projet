const mongoose = require('mongoose');
const Game = require('./models/game');
const fs = require("fs-extra");
const { docs } = require('./seed-data')

const clientOptions = {
  useNewUrlParser: true,
  dbName: 'mygamelist'
};

(async () => {
  fs.copy('./public/seed-images', './public/images', function (err) {
    if (err) {
      console.log('An error occured while copying the folder.')
      return console.error(err)
    }
    console.log('Copy completed!')
  });
  try {
    await mongoose.connect(process.env.URL_MONGO, clientOptions)
    console.log('Connected');
    await Game.deleteMany({});
    await Game.insertMany(docs);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
    throw error;
  }
})();
