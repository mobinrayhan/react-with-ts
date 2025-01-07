import { useTimerContext } from "../store/timers-context.tsx";
import Button from "./UI/Button.tsx";

export default function Header() {
  const timerReducer = useTimerContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button
        onClick={() =>
          timerReducer.isRunning
            ? timerReducer.stopTimer()
            : timerReducer.startTimer()
        }
      >
        {timerReducer.isRunning ? "Stop" : "Start"} Timers
      </Button>
    </header>
  );
}
