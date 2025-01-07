import { createContext, ReactNode, useContext, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimerState = {
  timers: Timer[];
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

const initialState: TimerState = {
  isRunning: true,
  timers: [],
};

type AddTimerType = {
  type: "ADD_TIMER";
  payload: Timer;
};
type StopTimer = {
  type: "STOP_TIMER";
};
type StartTimer = {
  type: "START_TIMER";
};

type TimerReducerAction = AddTimerType | StopTimer | StartTimer;

const timerReducer = (state: TimerState, action: TimerReducerAction) => {
  switch (action.type) {
    case "ADD_TIMER":
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };
      break;
    case "START_TIMER":
      return {
        ...state,
        isRunning: true,
      };
    case "STOP_TIMER":
      return {
        ...state,
        isRunning: false,
      };

    default:
      return state;
  }
};

const TimerContextProvider = ({ children }: TimerContextProviderProps) => {
  const [{ isRunning, timers }, dispatch] = useReducer(
    timerReducer,
    initialState
  );

  const ctxValues: TimerContextValue = {
    addTimer(timer: Timer) {
      dispatch({ type: "ADD_TIMER", payload: timer });
    },
    startTimer() {
      dispatch({ type: "START_TIMER" });
    },
    stopTimer() {
      dispatch({ type: "STOP_TIMER" });
    },
    isRunning: isRunning,
    timers: timers,
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
