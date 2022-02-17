const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* Get redis count data */
router.get('/statistics', async (req, res) => {
  let count = await redis.getAsync('added_todos')
  if(!count){
    await redis.setAsync('added_todos', 0)
    count = 0
  }

  return res.send({
    added_todos: count
  })
})

module.exports = router;
