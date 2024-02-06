const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "tasks" });
  }

  // The C of CRUD - Create operation

  async create(task) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (user_id, description, deadline, category, urgent, important) values (?, ?, ?, ?, ?, ?)`,
      [
        task.user_id,
        task.description,
        new Date(task.deadline),
        task.category,
        task.urgent,
        task.important,
      ]
    );
    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async edit(updatedTask, id) {
    const [result] = await this.database.query(
      `update ${this.table} set user_id = ?, description = ?, deadline = ?, category = ?, urgent = ?, important = ? where id = ?`,
      [
        updatedTask.user_id,
        updatedTask.description,
        new Date(updatedTask.deadline),
        updatedTask.category,
        updatedTask.urgent,
        updatedTask.important,
        id,
      ]
    );
    return result;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readByUser(userId) {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(
      `select * from ${this.table} where user_id = ? order by deadline asc`,
      [userId]
    );

    // Return the array of items
    return rows;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(
      `select * from ${this.table} order by deadline asc`
    );

    // Return the array of items
    return rows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }
}

module.exports = TaskManager;
