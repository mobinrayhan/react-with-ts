import { useState } from "react";
import goalsImg from "./assets/goals.jpg";
import CourseGoalList from "./components/CourseGoalList";
import Header from "./components/Header";
import NewGoal from "./components/NewGoal";

export interface CourseGoal {
  title: string;
  description: string;
  id: string;
}

export default function App() {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  const handleCourseGoal = (goal: CourseGoal) => {
    setGoals((prevGoals) => [...prevGoals, goal]);
  };

  function handleDeleteGoals(goalId: string) {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
  }

  return (
    <main>
      <Header image={{ src: goalsImg, alt: "A list of goals" }}>
        <h1>Your Course Goals</h1>
      </Header>
      <NewGoal onAddGoal={handleCourseGoal} />
      <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoals} />
    </main>
  );
}
