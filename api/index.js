const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
  const todo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});
app.put('/todos/:id', (req, res) => {
  todos = todos.map(t =>
    t.id == req.params.id ? { ...t, done: req.body.done } : t
  );
  res.sendStatus(204);
});
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.sendStatus(204);
});

const port = 4000;
app.listen(port, () =>
  console.log(`API listening at http://localhost:${port}`)
);
