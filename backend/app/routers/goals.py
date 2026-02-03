"""Goal routes for GoalTracker."""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db
from ..utils import calculate_progress

router = APIRouter(prefix="/goals", tags=["Goals"])


def enrich_goal(db_goal):
    return schemas.GoalOut(
        id=db_goal.id,
        title=db_goal.title,
        description=db_goal.description,
        start_date=db_goal.start_date,
        end_date=db_goal.end_date,
        progress=calculate_progress(db_goal),
        tasks=db_goal.tasks,
    )


@router.get("", response_model=list[schemas.GoalOut])
def list_goals(db: Session = Depends(get_db)):
    goals = crud.list_goals(db)
    return [enrich_goal(goal) for goal in goals]


@router.post("", response_model=schemas.GoalOut, status_code=status.HTTP_201_CREATED)
def create_goal(goal_in: schemas.GoalCreate, db: Session = Depends(get_db)):
    goal = crud.create_goal(db, goal_in)
    return enrich_goal(goal)


@router.get("/{goal_id}", response_model=schemas.GoalOut)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    goal = crud.get_goal(db, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return enrich_goal(goal)


@router.put("/{goal_id}", response_model=schemas.GoalOut)
def update_goal(goal_id: int, goal_in: schemas.GoalUpdate, db: Session = Depends(get_db)):
    goal = crud.get_goal(db, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    updated = crud.update_goal(db, goal, goal_in)
    return enrich_goal(updated)


@router.delete("/{goal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    goal = crud.get_goal(db, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    crud.delete_goal(db, goal)
    return None
