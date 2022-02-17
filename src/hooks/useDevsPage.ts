import { useContext } from "react";
import { DevsModalContext } from "../contexts/DevsModalContext";

export function useDevsPage() {
    const value = useContext(DevsModalContext)

    return value
}