import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createSubtask,
  createTask,
  deleteSubtask,
  deleteTask,
  fetchGoal,
  updateSubtask,
  updateTask,
} from "../api.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

const GoalTasksPage = () => {
  const { goalId } = useParams();
  const [goal, setGoal] = useState(null);
  const [status, setStatus] = useState("loading");

  const loadGoal = async () => {
    setStatus("loading");
    try {
      const data = await fetchGoal(goalId);
      setGoal(data);
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

  const handleSubtaskCreate = async (taskId, payload) => {
    await createSubtask(taskId, payload);
    loadGoal();
  };

  const handleSubtaskToggle = async (subtask) => {
    await updateSubtask(subtask.id, { is_completed: !subtask.is_completed });
    loadGoal();
  };

  const handleSubtaskDelete = async (subtaskId) => {
    await deleteSubtask(subtaskId);
    loadGoal();
  };

  if (status === "loading") {
    return <p>جاري التحميل...</p>;
  }

  if (status === "error") {
    return <p className="error">تعذر تحميل المهام.</p>;
  }

  if (!goal) {
    return null;
  }

  return (
    <section className="page tasks-page">
      <div className="tasks-page__header">
        <div>
          <p className="muted">هدفك الحالي</p>
          <h2>{goal.title}</h2>
          <p>{goal.description || "لا يوجد وصف."}</p>
        </div>
        <div className="tasks-page__meta">
          <span className="badge">{goal.progress}%</span>
          <Link className="secondary" to={`/goals/${goal.id}`}>
            الرجوع للتفاصيل
          </Link>
        </div>
      </div>
      <div className="tasks-page__content">
        <aside className="tasks-page__aside">
          <TaskForm onSubmit={handleTaskCreate} />
          <div className="card tasks-page__summary">
            <h4>ملخص سريع</h4>
            <p className="muted">عدد المهام: {goal.tasks.length}</p>
            <p className="muted">نسبة الإنجاز: {goal.progress}%</p>
          </div>
        </aside>
        <section className="tasks-page__board">
          <h3>لوحة المهام</h3>
          <TaskList
            tasks={goal.tasks}
            onToggle={handleTaskToggle}
            onDelete={handleTaskDelete}
            onSubtaskCreate={handleSubtaskCreate}
            onSubtaskToggle={handleSubtaskToggle}
            onSubtaskDelete={handleSubtaskDelete}
          />
        </section>
      </div>
    </section>
  );
};

export default GoalTasksPage;
