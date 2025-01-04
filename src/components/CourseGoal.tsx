import { FC, PropsWithChildren } from "react";
import { type CourseGoal as CourseGoalType } from "../App";
import { DeleteGoalFN } from "./CourseGoalList";

// interface CourseGoalProps {
//   title: string;
//   //   children: ReactNode;
// }

// export default function CourseGoal({ title, children }: CourseGoalProps) {
//   return (
//     <article>
//       <div>
//         <h2>{title}</h2>
//         {children}
//       </div>
//       <button>Delete</button>
//     </article>
//   );
// }

type CourseGoalProps = PropsWithChildren<CourseGoalType & DeleteGoalFN>;

const CourseGoal: FC<CourseGoalProps> = ({
  children,
  onDeleteGoal,
  id,
  title,
}) => {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button onClick={() => onDeleteGoal(id)}>Delete</button>
    </article>
  );
};
export default CourseGoal;
