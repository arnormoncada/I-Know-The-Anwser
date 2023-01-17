import { CREATE_MATCH, GET_THE_MATCHES } from "../constants";
import  matchService  from "../services/matchService";
export const getMatchesAction = () => async (dispatch) => {

    try {
        const success = await matchService.getMatches();
        dispatch(getMatchSuccess(success));
    }
    catch (ex){
        console.log("Error: user could not be created");
        console.log(ex);
    }
}

export const createMatchAction = (match) => async (dispatch) => {
    try {
        const success = await matchService.createMatch(match);

        dispatch(CreateMatchSuccess(success));
    }
    catch (ex){
        console.log("Error: user could not be created");
        console.log(ex);
    }
}

export const getMatchSuccess = (user) => ({
    type: GET_THE_MATCHES,
    payload: user
});
export const CreateMatchSuccess = (match) => ({
    type: CREATE_MATCH,
    payload: match
});