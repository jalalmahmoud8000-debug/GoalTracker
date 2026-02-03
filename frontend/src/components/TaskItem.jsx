import React, { useState } from "react";

const TaskItem = ({ task, onToggle, onDelete, onSubtaskCreate, onSubtaskToggle, onSubtaskDelete }) => {
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [subtaskDescription, setSubtaskDescription] = useState("");

  const handleSubtaskSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = subtaskTitle.trim();
    if (!trimmedTitle) {
      return;
    }
    onSubtaskCreate(task.id, {
      title: trimmedTitle,
      description: subtaskDescription.trim() || null,
    });
    setSubtaskTitle("");
    setSubtaskDescription("");
  };

  return (
    <article className={`task-card ${task.is_completed ? "task-card--done" : ""}`}>
      <header className="task-card__header">
        <div className="task-card__tokens">
          <h4 className="token token--title">{task.title}</h4>
          <p className="token token--desc">{task.description || "لا يوجد وصف."}</p>
        </div>
        <span className="badge token token--status">{task.is_completed ? "مكتملة" : "جارية"}</span>
      </header>
      <div className="task-card__actions">
        <button className="secondary" onClick={() => onToggle(task)} type="button">
          {task.is_completed ? "تمييز كغير مكتملة" : "تمييز كمكتملة"}
        </button>
        <button className="danger" onClick={() => onDelete(task.id)} type="button">
          حذف
        </button>
      </div>
      <div className="subtasks">
        <div className="subtasks__header">
          <h5>المهام الفرعية</h5>
          <span className="muted">{task.subtasks?.length || 0}</span>
        </div>
        <div className="subtask-list">
          {task.subtasks?.length ? (
            task.subtasks.map((subtask) => (
              <div key={subtask.id} className={`subtask ${subtask.is_completed ? "subtask--done" : ""}`}>
                <div className="subtask__content">
                  <p className="token token--subtask-title">{subtask.title}</p>
                  {subtask.description && (
                    <span className="token token--subtask-desc">{subtask.description}</span>
                  )}
                </div>
                <div className="subtask__actions">
                  <button className="secondary" onClick={() => onSubtaskToggle(subtask)} type="button">
                    {subtask.is_completed ? "إرجاع" : "إنهاء"}
                  </button>
                  <button className="danger" onClick={() => onSubtaskDelete(subtask.id)} type="button">
                    حذف
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="muted">لا توجد مهام فرعية بعد.</p>
          )}
        </div>
        <form className="subtask-form" onSubmit={handleSubtaskSubmit}>
          <input
            placeholder="عنوان المهمة الفرعية"
            value={subtaskTitle}
            onChange={(event) => setSubtaskTitle(event.target.value)}
            required
          />
          <input
            placeholder="وصف مختصر (اختياري)"
            value={subtaskDescription}
            onChange={(event) => setSubtaskDescription(event.target.value)}
          />
          <button className="primary" type="submit">
            إضافة مهمة فرعية
          </button>
        </form>
      </div>
    </article>
  );
};

export default TaskItem;
