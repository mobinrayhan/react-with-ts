import { useDispatch, useSelector } from "react-redux";
import { type CartDispatch, type CartSelector } from "./store";

export const useCartDispatch = useDispatch.withTypes<CartDispatch>();
export const useCartSelector = useSelector.withTypes<CartSelector>();
