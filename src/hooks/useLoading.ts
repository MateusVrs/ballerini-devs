import { useContext } from "react";
import { LoandingContext } from "../contexts/LoadingContext";

export function useLoading() {
    const value = useContext(LoandingContext)

    return value
}