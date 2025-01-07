import { type Timer } from "../store/timers-context.tsx";
import Container from "./UI/Container.tsx";

export default function Timer({ duration, name }: Timer) {
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{duration}</p>
    </Container>
  );
}
