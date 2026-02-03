import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTask,
  deleteGoal,
  deleteTask,
  fetchGoal,
  updateGoal,
  updateTask,
} from "../api.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

const GoalDetailPage = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [status, setStatus] = useState("loading");
  const [editMode, setEditMode] = useState(false);
  const [editState, setEditState] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const loadGoal = async () => {
    setStatus("loading");
    try {
      const data = await fetchGoal(goalId);
      setGoal(data);
      setEditState({
        title: data.title,
        description: data.description || "",
        start_date: data.start_date || "",
        end_date: data.end_date || "",
      });
      setStatus("ready");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    loadGoal();
  }, [goalId]);

  const handleTaskCreate = async (payload) => {
    await createTask(goalId, payload);
    loadGoal();
  };

  const handleTaskToggle = async (task) => {
    await updateTask(task.id, { is_completed: !task.is_completed });
    loadGoal();
  };

  const handleTaskDelete = async (taskId) => {
    await deleteTask(taskId);
    loadGoal();
  };

  const handleGoalDelete = async () => {
    await deleteGoal(goalId);
    navigate("/");
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditState((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    await updateGoal(goalId, {
      ...editState,
      start_date: editState.start_date || null,
      end_date: editState.end_date || null,
    });
    setEditMode(false);
    loadGoal();
  };

  if (status === "loading") {
    return <p>جاري التحميل...</p>;
  }

  if (status === "error") {
    return <p className="error">تعذر تحميل الهدف.</p>;
  }

  if (!goal) {
    return null;
  }

  return (
    <section className="page">
      <div className="page__grid">
        <div className="card">
          <div className="card__header">
            <h2>{goal.title}</h2>
            <span className="badge">{goal.progress}%</span>
          </div>
          <p>{goal.description || "لا يوجد وصف."}</p>
          <p className="muted">
            من {goal.start_date || "غير محدد"} إلى {goal.end_date || "غير محدد"}
          </p>
          <div className="card__actions">
            <button className="secondary" onClick={() => setEditMode((prev) => !prev)} type="button">
              {editMode ? "إلغاء" : "تعديل"}
            </button>
            <button className="danger" onClick={handleGoalDelete} type="button">
              حذف الهدف
            </button>
          </div>
          {editMode && (
            <form className="form" onSubmit={handleEditSubmit}>
              <label>
                العنوان
                <input name="title" value={editState.title} onChange={handleEditChange} required />
              </label>
              <label>
                الوصف
                <textarea name="description" value={editState.description} onChange={handleEditChange} />
              </label>
              <div className="grid">
                <label>
                  تاريخ البداية
                  <input
                    type="date"
                    name="start_date"
                    value={editState.start_date}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  تاريخ النهاية
                  <input type="date" name="end_date" value={editState.end_date} onChange={handleEditChange} />
                </label>
              </div>
              <button type="submit" className="primary">
                حفظ التعديلات
              </button>
            </form>
          )}
        </div>
        <div>
          <TaskForm onSubmit={handleTaskCreate} />
          <section className="card">
            <h3>المهام</h3>
            <TaskList tasks={goal.tasks} onToggle={handleTaskToggle} onDelete={handleTaskDelete} />
          </section>
        </div>
      </div>
    </section>
  );
};

export default GoalDetailPage;
