"""Application entry point for GoalTracker."""
from __future__ import annotations

import argparse
from dataclasses import dataclass


@dataclass(frozen=True)
class Goal:
    title: str
    status: str = "pending"


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Track a new goal.")
    parser.add_argument(
        "title",
        nargs="?",
        default="Start tracking your first goal",
        help="Title of the goal to track.",
    )
    return parser.parse_args(argv)


def build_goal(title: str) -> Goal:
    return Goal(title=title)


def format_goal(goal: Goal) -> str:
    return f"Goal: {goal.title} (status: {goal.status})"


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    goal = build_goal(args.title)
    print(format_goal(goal))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
