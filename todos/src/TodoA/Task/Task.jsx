import React, { useState, useEffect } from 'react';
import { FaTrash, FaCheck, FaDotCircle } from 'react-icons/fa';
import { useSortable } from 'react'; // Assuming you are importing it from somewhere

export default function Task({ task, handleUpdate, handleDelete }) {
  function formatTimestamp(timestamp) {
    const milliseconds =
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
    const date = new Date(milliseconds);
    const month = date.toLocaleString('en-us', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  return (
    <div
      className="task"
      style={{
        backgroundColor: task.is_done ? '#03c252e0' : 'rgba(24, 26, 27, 0.65)',
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      ref={setNodeRef}
    >
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
      <p className="text">{task.text}</p>
      <div className="task-actions">
        <p className="time" {...attributes} {...listeners}>
          {formatTimestamp(task.date_added)}
        </p>
        <div>
          <FaTrash size={20} onClick={() => handleDelete(task.id)} />
          {!task.is_done ? (
            <FaCheck
              size={20}
              onClick={() => handleUpdate(task.id, !task.is_done)}
            />
          ) : (
            <FaDotCircle
              size={20}
              onClick={() => handleUpdate(task.id, !task.is_done)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
