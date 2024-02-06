import axios from "axios";
import { IoTime } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import Moment from "moment";
import PropTypes from "prop-types";
// import EditModal from "./EditModal";

function TaskList({
  fetchTasks,
  filterImportant,
  filterUrgent,
  tasks,
  config,
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const ref = useRef(null);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3310/api/tasks/${id}`);
    } catch (err) {
      console.error(err);
    }
    fetchTasks();
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.value = selectedTask.description;
    }
  }, [ref, selectedTask]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const newDescription = e.target.description.value;

    try {
      await axios.put(
        `http://localhost:3310/api/tasks/${selectedTask.id}`,
        {
          ...selectedTask,
          description: newDescription,
        },
        config
      );
    } catch (err) {
      console.error(err);
    }
    fetchTasks();
  };

  return (
    <div className="list">
      {tasks
        .filter((item) => (filterImportant ? item.important : true))
        .filter((item2) => (filterUrgent ? item2.urgent : true))
        .map((task) => (
          <div className="item" key={task.id}>
            <div className="left">{task.description}</div>
            <div className="right">
              {task.urgent === 1 && <div className="urgent">Urgent</div>}
              {task.important === 1 && (
                <div className="important">Important</div>
              )}
              <div className="date">
                <IoTime size="20px" />
                {Moment(task.deadline).format("MMM Do")}
              </div>
              <button
                type="button"
                className="deleteButton"
                onClick={() => deleteTask(task.id)}
                aria-label="Done"
              >
                <FaCheck />
              </button>
              <button
                type="button"
                className="editButton"
                aria-label="Done"
                onClick={() => {
                  setSelectedTask(task);
                  setOpenEditModal(true);
                }}
              >
                <FaRegEdit size="20px" />
              </button>
            </div>
          </div>
        ))}
      {openEditModal && (
        <form
          onSubmit={(e) => {
            handleEdit(e);
          }}
        >
          <input type="text" name="description" ref={ref} />
          <button type="submit">Valider</button>
        </form>
      )}
    </div>
  );
}

TaskList.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  filterImportant: PropTypes.bool.isRequired,
  filterUrgent: PropTypes.bool.isRequired,
  config: PropTypes.shape({
    headers: PropTypes.shape({
      Authorization: PropTypes.string,
    }),
  }).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user_id: PropTypes.number,
      description: PropTypes.string,
      category: PropTypes.string,
      urgent: PropTypes.number,
      important: PropTypes.number,
    })
  ).isRequired,
};

export default TaskList;
