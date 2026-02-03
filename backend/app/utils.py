"""Utility helpers for GoalTracker."""
from __future__ import annotations

from . import models


def calculate_progress(goal: models.Goal) -> float:
    if not goal.tasks:
        return 0.0
    completed = sum(1 for task in goal.tasks if task.is_completed)
    return round((completed / len(goal.tasks)) * 100, 2)
