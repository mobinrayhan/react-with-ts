import { useDispatch } from "react-redux";
import { type CartDispatch } from "./store";

export const useCartDispatch = useDispatch.withTypes<CartDispatch>();
