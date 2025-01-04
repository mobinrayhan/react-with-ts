import { type CourseGoal as CourseGoalsType } from "../App";
import CourseGoal from "./CourseGoal";

export interface DeleteGoalFN {
  onDeleteGoal: (goalId: string) => void;
}

interface CourseGoalListProps {
  goals: CourseGoalsType[];
}

const CourseGoalList = ({
  goals,
  onDeleteGoal,
}: CourseGoalListProps & DeleteGoalFN) => {
  return (
    <ul>
      {goals.map((goal) => (
        <CourseGoal {...goal} key={goal.id} onDeleteGoal={onDeleteGoal}>
          <p>{goal.description}</p>
        </CourseGoal>
      ))}
    </ul>
  );
};
export default CourseGoalList;
