const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const taskControllers = require("./controllers/taskControllers");
const authControllers = require("./controllers/authControllers");
const { verifyToken } = require("./services/auth");

// Route to get a list of items
router.get("/tasks", taskControllers.browse);

// Route to get a specific item by ID
router.get("/tasks/user/:id", taskControllers.getByUser);

// Route to add a new item
router.post("/login", authControllers.login);

// Route to delete an item
router.delete("/tasks/:id", taskControllers.destroy);

router.use(verifyToken);

router.post("/tasks", taskControllers.add);

module.exports = router;
