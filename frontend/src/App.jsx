import axios from "axios";
import { useState, useEffect } from "react";
import Moment from "moment";
import { IoTime } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [important, setImportant] = useState(false);
  const [category, setCategory] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [checkedUrgent, setCheckedUrgent] = useState(false);
  const [checkedImportant, setCheckedImportant] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [user, setUser] = useState({});
  const [filterImportant, setFilterImportant] = useState(false);
  const [filterUrgent, setFilterUrgent] = useState(false);

  /* dates */
  const currentDate = new Date();
  const soon = new Date();
  soon.setDate(soon.getDate() + 3);
  /* END */

  const fetchTasks = async () => {
    axios.get(`http://localhost:3310/api/tasks/user/${user.id}`).then((res) => {
      setTaskList(res.data);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3310/api/login", {
        inputEmail,
        inputPassword,
      });
      setUser(res.data.user);
      setInputEmail("");
      setInputPassword("");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const logout = () => {
    setUser({});
    setInputEmail("");
    setInputPassword("");
    localStorage.clear();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3310/api/tasks",
        {
          user_id: user.id,
          description: newTask,
          deadline: soon,
          category,
          urgent,
          important,
        },
        config
      );
    } catch (err) {
      console.error(err);
    }
    fetchTasks();
    setNewTask("");
    setCategory("");
    setImportant(false);
    setUrgent(false);
    setCheckedUrgent(false);
    setCheckedImportant(false);
  };

  const handleImportant = () => {
    setImportant((current) => !current);
    setCheckedImportant(!checkedImportant);
  };

  const handleUrgent = () => {
    setUrgent((current) => !current);
    setCheckedUrgent(!checkedUrgent);
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3310/api/tasks/${taskId}`);
    } catch (err) {
      console.error(err);
    }
    fetchTasks();
  };

  return (
    <div className="App">
      {user.pseudo && (
        <div className="header">
          <button className="button" type="submit" onClick={logout}>
            <RiLogoutBoxLine size="20px" />
            Logout{" "}
          </button>
        </div>
      )}
      {!user.pseudo && (
        <div className="login">
          <div className="invite">
            <IoIosListBox size="50px" />{" "}
            <p>Please login to access your todolist</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={inputEmail}
              placeholder="Email"
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <input
              type="password"
              value={inputPassword}
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <button className="button" type="submit">
              Login{" "}
            </button>
          </form>
        </div>
      )}
      {user.pseudo && (
        <div className="allButHeader">
          <div className="leftApp">
            <div className="title">
              <h1>Add a task</h1>
            </div>
            <div className="formDiv">
              <form className="add-task" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="file-input">
                    New task
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                  </label>
                </div>
                {/* <div>
                <label htmlFor="file-input">
                  Category
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </label>
              </div> */}
                <div>
                  <label htmlFor="file-input" className="checkbox">
                    Important
                    <input
                      type="checkbox"
                      checked={checkedImportant}
                      onChange={handleImportant}
                    />{" "}
                  </label>{" "}
                </div>
                <div>
                  <label htmlFor="file-input" className="checkbox">
                    {" "}
                    Urgent
                    <input
                      type="checkbox"
                      checked={checkedUrgent}
                      onChange={handleUrgent}
                    />{" "}
                  </label>
                </div>{" "}
                <input type="submit" value="Add task" />
              </form>
            </div>
            <div className="title">
              <h1>Filters</h1>
            </div>
            <div className="filterButtons">
              <button
                className={filterImportant ? "active" : "inactive"}
                type="button"
                onClick={() => setFilterImportant(!filterImportant)}
              >
                Important
              </button>
              <button
                className={filterUrgent ? "active" : "inactive"}
                type="button"
                onClick={() => setFilterUrgent(!filterUrgent)}
              >
                Urgent
              </button>
            </div>
          </div>
          <div className="rightApp">
            <div className="title">
              <h1>Good morning {user.pseudo}!</h1>
              <h2>Today, {Moment(currentDate).format("LL")}</h2>
            </div>
            <div className="list">
              {taskList
                .filter((item) => (filterImportant ? item.important : true))
                .filter((item2) => (filterUrgent ? item2.urgent : true))
                .map((task) => (
                  <div className="item" key={task.id}>
                    <div className="left">{task.description}</div>
                    <div className="right">
                      {task.urgent === 1 && (
                        <div className="urgent">Urgent</div>
                      )}
                      {task.important === 1 && (
                        <div className="important">Important</div>
                      )}
                      <div className="date">
                        <IoTime size="20px" />
                        {Moment(task.deadline).format("MMM Do")}
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        aria-label="Done"
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
