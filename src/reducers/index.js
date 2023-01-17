import { combineReducers } from "redux";
import user from "./userReducer";
import matches from "./matchReducer"
import ingame from "./inGameReducer"


export default combineReducers({
    user,
    matches,
    ingame
});