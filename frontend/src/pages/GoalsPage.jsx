import React, { useEffect, useState } from "react";
import { createGoal, deleteGoal, fetchGoals } from "../api.js";
import GoalCard from "../components/GoalCard.jsx";
import GoalForm from "../components/GoalForm.jsx";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [status, setStatus] = useState("loading");

  const loadGoals = async () => {
    setStatus("loading");
    try {
      const data = await fetchGoals();
      setGoals(data);
      setStatus("ready");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleCreate = async (payload) => {
    await createGoal(payload);
    loadGoals();
  };

  const handleDelete = async (goalId) => {
    await deleteGoal(goalId);
    loadGoals();
  };

  return (
    <section className="page">
      <div className="page__grid">
        <GoalForm onSubmit={handleCreate} submitLabel="إنشاء هدف" />
        <div className="page__content">
          <h2>كل الأهداف</h2>
          {status === "loading" && <p>جاري التحميل...</p>}
          {status === "error" && <p className="error">حدث خطأ أثناء تحميل البيانات.</p>}
          <div className="cards">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsPage;
