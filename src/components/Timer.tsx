import { useEffect, useRef, useState } from "react";
import { useTimerContext, type Timer } from "../store/timers-context.tsx";
import Container from "./UI/Container.tsx";

const INTERVAL_TIME = 50;

export default function Timer({ duration, name }: Timer) {
  const { isRunning } = useTimerContext();
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const intervalRef = useRef<number | null>();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            return prevTime;
          }
          return prevTime - INTERVAL_TIME;
        });
      }, INTERVAL_TIME);
    }

    if (intervalRef.current && remainingTime <= 0) {
      clearInterval(intervalRef.current);
    }

    return () =>
      intervalRef.current ? clearInterval(intervalRef.current) : undefined;
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
