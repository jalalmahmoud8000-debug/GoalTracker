import React, { useState } from "react";

const initialState = {
  title: "",
  description: "",
  start_date: "",
  end_date: "",
};

const GoalForm = ({ onSubmit, submitLabel }) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formState,
      start_date: formState.start_date || null,
      end_date: formState.end_date || null,
    });
    setFormState(initialState);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{submitLabel}</h3>
      <label>
        العنوان
        <input name="title" value={formState.title} onChange={handleChange} required />
      </label>
      <label>
        الوصف
        <textarea name="description" value={formState.description} onChange={handleChange} />
      </label>
      <div className="grid">
        <label>
          تاريخ البداية
          <input type="date" name="start_date" value={formState.start_date} onChange={handleChange} />
        </label>
        <label>
          تاريخ النهاية
          <input type="date" name="end_date" value={formState.end_date} onChange={handleChange} />
        </label>
      </div>
      <button type="submit" className="primary">
        {submitLabel}
      </button>
    </form>
  );
};

export default GoalForm;
