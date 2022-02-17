const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

const {getAsync, setAsync} = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  let count = await getAsync('added_todos')
  if(!count){
    await setAsync('added_todos', 1)
  }else{
    count = parseInt(count)
    await setAsync('added_todos', count + 1)
  }

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  // res.sendStatus(405); // Implement this
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  // res.sendStatus(405); // Implement this
  const todoObj = {
    text: req.todo.text,
    done: req.todo.done
  }

  Todo.findByIdAndUpdate(req.params.id, todoObj, { new: true })
      .then(updatedTodo => {
        res.json(updatedTodo)
      })
      .catch(error => {
        console.log(error)
        res.status(400).send({ error: 'put failed' })
      })
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
