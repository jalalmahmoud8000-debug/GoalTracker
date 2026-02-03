"""CRUD helpers for GoalTracker."""
from __future__ import annotations

from sqlalchemy.orm import Session

from . import models, schemas


def get_goal(db: Session, goal_id: int) -> models.Goal | None:
    return db.query(models.Goal).filter(models.Goal.id == goal_id).first()


def list_goals(db: Session) -> list[models.Goal]:
    return db.query(models.Goal).order_by(models.Goal.id).all()


def create_goal(db: Session, goal_in: schemas.GoalCreate) -> models.Goal:
    goal = models.Goal(**goal_in.dict())
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal


def update_goal(db: Session, goal: models.Goal, goal_in: schemas.GoalUpdate) -> models.Goal:
    data = goal_in.dict(exclude_unset=True)
    for key, value in data.items():
        setattr(goal, key, value)
    db.commit()
    db.refresh(goal)
    return goal


def delete_goal(db: Session, goal: models.Goal) -> None:
    db.delete(goal)
    db.commit()


def create_task(db: Session, goal: models.Goal, task_in: schemas.TaskCreate) -> models.Task:
    task = models.Task(**task_in.dict(), goal=goal)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def get_task(db: Session, task_id: int) -> models.Task | None:
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def update_task(db: Session, task: models.Task, task_in: schemas.TaskUpdate) -> models.Task:
    data = task_in.dict(exclude_unset=True)
    for key, value in data.items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task: models.Task) -> None:
    db.delete(task)
    db.commit()


def create_subtask(db: Session, task: models.Task, subtask_in: schemas.SubTaskCreate) -> models.SubTask:
    subtask = models.SubTask(**subtask_in.dict(), task=task)
    db.add(subtask)
    db.commit()
    db.refresh(subtask)
    return subtask


def get_subtask(db: Session, subtask_id: int) -> models.SubTask | None:
    return db.query(models.SubTask).filter(models.SubTask.id == subtask_id).first()


def update_subtask(db: Session, subtask: models.SubTask, subtask_in: schemas.SubTaskUpdate) -> models.SubTask:
    data = subtask_in.dict(exclude_unset=True)
    for key, value in data.items():
        setattr(subtask, key, value)
    db.commit()
    db.refresh(subtask)
    return subtask


def delete_subtask(db: Session, subtask: models.SubTask) -> None:
    db.delete(subtask)
    db.commit()
