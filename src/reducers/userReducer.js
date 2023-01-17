import { LOGIN_USER, REGISTER_USER } from "../constants";

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            // console.log("in reducer")
            // console.log(action.payload)
            return action.payload;
        default: 
            return state;
    }
};