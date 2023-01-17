import { IN_GAME } from "../constants";

export default function inGameReducer(state = {}, action) {
    switch (action.type) {
        case IN_GAME:
            console.log("ingamereducer",action.payload)
            return action.payload;
        default: 
            return state;
    }
};