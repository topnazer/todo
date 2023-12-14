import { useEffect, useState } from 'react';
import './TaskList.css';

import { FaTrash } from 'react-icons/fa';

export default function TaskList({ tasks, handleUpdate, handleDelete }) {
  
  return (
    <div className="tlist">
      {tasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}


function Task({ task, handleUpdate, handleDelete }) {
  const [currentTask, setTask] = useState(task);
  useEffect(() => {
    handleUpdate(currentTask.id, currentTask);
  }, [currentTask]);
  return (
    <div className={currentTask.done ? 't done' : 't undone'}>
      <p>{currentTask.text}</p>
      <div className="t-actions">
        <FaTrash size={18} onClick={() => handleDelete(currentTask.id)} />
        <input
          type="checkbox"
          id="isdone"
          name="isdone"
          checked={currentTask.done}
          onClick={() => {
            setTask({ ...currentTask, done: !currentTask.done });
          }}
        />
      </div>
      <div className="task-cat">
        <div className={`cat ${task.category}`}>
          <p>{task.category}</p>
        </div>
        {task.is_important && (
          <div className="cat important">
            <p>important</p>
          </div>
        )}
      </div>
    </div>
  );
}