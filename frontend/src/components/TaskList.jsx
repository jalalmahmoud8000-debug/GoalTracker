import React from "react";

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (!tasks.length) {
    return <p className="muted">لا توجد مهام بعد.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <div>
            <h4>{task.title}</h4>
            <p>{task.description || "لا يوجد وصف."}</p>
          </div>
          <div className="task__actions">
            <button className="secondary" onClick={() => onToggle(task)} type="button">
              {task.is_completed ? "تمييز كغير مكتملة" : "تمييز كمكتملة"}
            </button>
            <button className="danger" onClick={() => onDelete(task.id)} type="button">
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
