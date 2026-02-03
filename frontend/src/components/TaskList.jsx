import React from "react";
import TaskItem from "./TaskItem.jsx";

const TaskList = ({ tasks, onToggle, onDelete, onSubtaskCreate, onSubtaskToggle, onSubtaskDelete }) => {
  if (!tasks.length) {
    return <p className="muted">لا توجد مهام بعد.</p>;
  }

  return (
    <div className="task-board">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onSubtaskCreate={onSubtaskCreate}
          onSubtaskToggle={onSubtaskToggle}
          onSubtaskDelete={onSubtaskDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
