import axios from "axios";
import { useState, useEffect } from "react";
import Moment from "moment";
import { RiLogoutBoxLine } from "react-icons/ri";
import Connexion from "./components/Connexion";
import TaskList from "./components/TaskList";

function App() {
  const [newTask, setNewTask] = useState("");
  const [important, setImportant] = useState(false);
  const [category, setCategory] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [checkedUrgent, setCheckedUrgent] = useState(false);
  const [checkedImportant, setCheckedImportant] = useState(false);
  const [user, setUser] = useState({});
  const [filterImportant, setFilterImportant] = useState(false);
  const [filterUrgent, setFilterUrgent] = useState(false);
  const [tasks, setTasks] = useState([]);

  /* dates */
  const currentDate = new Date();
  const soon = new Date();
  soon.setDate(soon.getDate() + 3);
  /* END */

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const logout = () => {
    setUser({});
    localStorage.clear();
  };

  const fetchTasks = async () => {
    axios.get(`http://localhost:3310/api/tasks/user/${user.id}`).then((res) => {
      setTasks(res.data);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

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
      {!user.pseudo && <Connexion setUser={setUser} />}
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
            <TaskList
              fetchTasks={fetchTasks}
              filterImportant={filterImportant}
              filterUrgent={filterUrgent}
              tasks={tasks}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
