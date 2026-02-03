"""FastAPI application for GoalTracker."""
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import goals, tasks

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GoalTracker API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(goals.router)
app.include_router(tasks.router)


@app.get("/")
def read_root():
    return {"message": "GoalTracker API is running"}
