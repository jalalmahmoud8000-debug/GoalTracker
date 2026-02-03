import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import GoalsPage from "./pages/GoalsPage.jsx";
import GoalDetailPage from "./pages/GoalDetailPage.jsx";
import GoalTasksPage from "./pages/GoalTasksPage.jsx";

const App = () => {
  return (
    <div className="app">
      <header className="app__header">
        <h1>GoalTracker</h1>
        <nav>
          <NavLink to="/" end>
            الأهداف
          </NavLink>
        </nav>
      </header>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<GoalsPage />} />
          <Route path="/goals/:goalId" element={<GoalDetailPage />} />
          <Route path="/goals/:goalId/tasks" element={<GoalTasksPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
