import React, { useState } from "react";

const initialState = {
  title: "",
  description: "",
};

const TaskForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...formState, is_completed: false });
    setFormState(initialState);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>إضافة مهمة</h3>
      <label>
        العنوان
        <input name="title" value={formState.title} onChange={handleChange} required />
      </label>
      <label>
        الوصف
        <textarea name="description" value={formState.description} onChange={handleChange} />
      </label>
      <button type="submit" className="primary">
        إضافة المهمة
      </button>
    </form>
  );
};

export default TaskForm;
