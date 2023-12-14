import { useState } from 'react';
import './TaskForm.css';

export default function TaskForm({ handleAdd }) {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState("work");

  const addTask = () => {
    handleAdd(task);
    setTask('');
  };
  return (
    <div className="tform">
      <h3>Add Task</h3>
      <input
        type="text"
        name="task"
        id="task"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
       <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="work">Work</option>
          <option value="school">School</option>
          <option value="chores">Chores</option>
          <option value="others">Others</option>
        </select>
      <button onClick={addTask}>Add</button>
    </div>
  );
}