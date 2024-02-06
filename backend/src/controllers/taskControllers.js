// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const tasks = await tables.tasks.readAll();

    // Respond with the items in JSON format
    res.json(tasks);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const task = await tables.tasks.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (task == null) {
      res.sendStatus(404);
    } else {
      res.json(task);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getByUser = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const tasks = await tables.tasks.readByUser(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (tasks == null) {
      res.sendStatus(404);
    } else {
      res.json(tasks);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add = async (req, res, next) => {
  // Extract the item data from the request body
  const newTask = req.body;
  try {
    // Insert the item into the database
    const insertId = await tables.tasks.create(newTask);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const updatedTask = req.body;
  console.warn(id);
  console.warn(updatedTask);

  try {
    const result = await tables.tasks.edit(updatedTask, id);
    console.warn(result);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await tables.tasks.delete(id);
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  browse,
  read,
  getByUser,
  update,
  add,
  destroy,
};
