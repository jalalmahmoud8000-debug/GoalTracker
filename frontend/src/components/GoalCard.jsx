import React from "react";
import { Link } from "react-router-dom";

const GoalCard = ({ goal, onDelete }) => {
  return (
    <article className="card">
      <div className="card__header">
        <h3>{goal.title}</h3>
        <span className="badge">{goal.progress}%</span>
      </div>
      <p>{goal.description || "لا يوجد وصف."}</p>
      <p className="muted">
        من {goal.start_date || "غير محدد"} إلى {goal.end_date || "غير محدد"}
      </p>
      <div className="card__actions">
        <Link className="primary" to={`/goals/${goal.id}`}>
          التفاصيل
        </Link>
        <button className="danger" onClick={() => onDelete(goal.id)} type="button">
          حذف
        </button>
      </div>
    </article>
  );
};

export default GoalCard;
