const Todo = require("../models/todo.model");

const getAllTodos = async (req, res, next) => {
  let todos;
  try {
    todos = await Todo.getAllTodos();
  } catch (error) {
    return next(error);
  }

  res.json({
    todos: todos,
  });
};

const addTodo = async (req, res, next) => {
  const todoText = req.body.text;

  const todo = new Todo(todoText);

  let insertedId;
  try {
    const result = await todo.save();
    insertedId = result.insertedId;
  } catch (error) {
    return next(error);
  }

  todo.id = insertedId.toString();

  res.json({
    message: "Added todo successfully!",
    createdTodo: todo,
  });
};

const updateTodo = async (req, res, next) => {
  const todoID = req.params.id;
  const newTodoText = req.body.newText;

  const todo = new Todo(newTodoText, todoID);

  try {
    await todo.save();
  } catch (error) {
    next(error);
  }

  res.json({ message: "Todo updated", updateTodo: todo });
};

const deleteTodo = async (req, res, next) => {

    const todoID = req.params.id;

    const todo = new Todo(null, todoID);

    try {
        await todo.delete();
    } catch (error) {
        next(error);
    }

  res.json({ message: "Todo deleted" });
};

module.exports = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
