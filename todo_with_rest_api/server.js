const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

let todos = [
    {
        id: 1,
        text: "complete react",
        done: false
    },
    {
        id: 2,
        text: 'complete devops',
        done: false
    }
];

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('todo not found');
    }
});

app.post('/todos', (req, res) => {
    const { text } = req.body;
    const id = todos.length + 1;
    const newTodo = { id, text, done: false };
    todos.push(newTodo);
    res.status(201).json({
        msg: "todo added", newTodo
    });
});

app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex] = { id, text, done: false };
        res.json(todos[todoIndex]);
    } else {
        res.status(404).send("Todo not found");
    }
});

// Route to delete a todo
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.json(deletedTodo[0]);
    } else {
        res.status(404).send("Todo not found");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
