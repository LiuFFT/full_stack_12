const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState)
  mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(x => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`,
        );
      })
      .catch(err => {
        console.error('Error connecting to mongo', err);
      });


module.exports = {
  Todo
}
