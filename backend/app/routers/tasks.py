"""Task routes for GoalTracker."""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

router = APIRouter(tags=["Tasks"])


@router.post("/goals/{goal_id}/tasks", response_model=schemas.TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(goal_id: int, task_in: schemas.TaskCreate, db: Session = Depends(get_db)):
    goal = crud.get_goal(db, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    task = crud.create_task(db, goal, task_in)
    return task


@router.put("/tasks/{task_id}", response_model=schemas.TaskOut)
def update_task(task_id: int, task_in: schemas.TaskUpdate, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return crud.update_task(db, task, task_in)


@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    crud.delete_task(db, task)
    return None


@router.post("/tasks/{task_id}/subtasks", response_model=schemas.SubTaskOut, status_code=status.HTTP_201_CREATED)
def create_subtask(task_id: int, subtask_in: schemas.SubTaskCreate, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    subtask = crud.create_subtask(db, task, subtask_in)
    return subtask


@router.put("/subtasks/{subtask_id}", response_model=schemas.SubTaskOut)
def update_subtask(subtask_id: int, subtask_in: schemas.SubTaskUpdate, db: Session = Depends(get_db)):
    subtask = crud.get_subtask(db, subtask_id)
    if not subtask:
        raise HTTPException(status_code=404, detail="Subtask not found")
    return crud.update_subtask(db, subtask, subtask_in)


@router.delete("/subtasks/{subtask_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_subtask(subtask_id: int, db: Session = Depends(get_db)):
    subtask = crud.get_subtask(db, subtask_id)
    if not subtask:
        raise HTTPException(status_code=404, detail="Subtask not found")
    crud.delete_subtask(db, subtask)
    return None
