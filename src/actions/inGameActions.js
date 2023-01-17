import { IN_GAME } from "../constants";

export const setInGame = (bool) => ({
    type: IN_GAME,
    payload: bool
});