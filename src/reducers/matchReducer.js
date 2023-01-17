// import { LOGIN_USER, REGISTER_USER } from "../constants";
import { CREATE_THE_MATCH, GET_THE_MATCHES } from "../constants";

export default function matchReducer(state = [], action) {
    switch (action.type) {
        case GET_THE_MATCHES:
            // console.log("in reducer")
            // console.log(action.payload)
            return action.payload;
            case CREATE_THE_MATCH:
                let newState = [...state]; 
                newState.push(action.payload)
                return newState;
        default: 
            return state;
    }
};