import { createContext, ReactNode, useContext } from "react";

type Timer = {
  name: string;
  duration: number;
};

type TimerState = {
  timer: Timer[];
  isRunning: boolean;
};

type TimerContextValue = {
  addTimer: (timer: Timer) => void;
  startTimer: () => void;
  stopTimer: () => void;
} & TimerState;

const TimerContext = createContext<TimerContextValue | null>(null);

type TimerContextProviderProps = {
  children: ReactNode;
};

const TimerContextProvider = ({ children }: TimerContextProviderProps) => {
  const ctxValues: TimerContextValue = {
    addTimer(timer: Timer) {},
    startTimer() {},
    stopTimer() {},
    isRunning: false,
    timer: [],
  };

  return (
    <TimerContext.Provider value={ctxValues}>{children}</TimerContext.Provider>
  );
};
export default TimerContextProvider;

export const useTimerContext = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("Timer Context Is Null");
  }

  return context;
};
