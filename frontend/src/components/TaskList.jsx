import axios from "axios";
import { IoTime } from "react-icons/io5";
import { useState } from "react";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import Moment from "moment";
import PropTypes from "prop-types";
import EditModal from "./EditModal";

function TaskList({ fetchTasks, filterImportant, filterUrgent, tasks }) {
  const [openEditModal, setOpenEditModal] = useState(false);

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3310/api/tasks/${taskId}`);
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
                onClick={() => setOpenEditModal(!openEditModal)}
                aria-label="Done"
              >
                <FaRegEdit size="20px" />
              </button>
            </div>
          </div>
        ))}
      {openEditModal && <EditModal />}
    </div>
  );
}

TaskList.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  filterImportant: PropTypes.bool.isRequired,
  filterUrgent: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user_id: PropTypes.number,
      description: PropTypes.string,
      category: PropTypes.string,
      urgent: PropTypes.bool,
      important: PropTypes.bool,
    })
  ).isRequired,
};

export default TaskList;
