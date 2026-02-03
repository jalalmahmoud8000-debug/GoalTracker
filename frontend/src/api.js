import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const fetchGoals = async () => {
  const { data } = await api.get("/goals");
  return data;
};

export const fetchGoal = async (goalId) => {
  const { data } = await api.get(`/goals/${goalId}`);
  return data;
};

export const createGoal = async (payload) => {
  const { data } = await api.post("/goals", payload);
  return data;
};

export const updateGoal = async (goalId, payload) => {
  const { data } = await api.put(`/goals/${goalId}`, payload);
  return data;
};

export const deleteGoal = async (goalId) => {
  await api.delete(`/goals/${goalId}`);
};

export const createTask = async (goalId, payload) => {
  const { data } = await api.post(`/goals/${goalId}/tasks`, payload);
  return data;
};

export const updateTask = async (taskId, payload) => {
  const { data } = await api.put(`/tasks/${taskId}`, payload);
  return data;
};

export const deleteTask = async (taskId) => {
  await api.delete(`/tasks/${taskId}`);
};
