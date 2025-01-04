import { FormEvent, useRef } from "react";
import { CourseGoal } from "../App";

interface NewGoalProps {
  onAddGoal: (newGoal: CourseGoal) => void;
}

const NewGoal = ({ onAddGoal }: NewGoalProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const handleSubmitGoal = (event: FormEvent) => {
    event.preventDefault();
    // const formEel = event.target as HTMLFormElement;
    // const formEel = event.currentTarget as HTMLFormElement;

    // const formEel = event.currentTarget;
    // const formData = new FormData(formEel);

    // const title = formData.get("goal") as string;
    // const description = formData.get("summary") as string;

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!title?.trim().length || !description?.trim().length) {
      alert("Input is invalid!");
      return;
    }

    const newGoal: CourseGoal = {
      title,
      description,
      id: crypto.randomUUID(),
    };

    onAddGoal(newGoal);
    formRef.current?.reset();
  };

  return (
    <form onSubmit={handleSubmitGoal} ref={formRef}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" name="goal" ref={titleRef} />
      </p>
      <p>
        <label htmlFor="summary">Short summary</label>
        <input id="summary" type="text" name="summary" ref={descriptionRef} />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );
};
export default NewGoal;
