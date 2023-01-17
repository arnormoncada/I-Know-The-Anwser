import { LOGIN_USER } from "../constants";
import userService from "../services/userService";

export const registerUser = async (username, displayName, password) => {
    try {
        const success = await userService.registerUser(username, displayName, password);
        // dispatch(createOrderSuccess(success));
    }
    catch (ex){
        console.log("Error: user could not be created");
        console.log(ex);
    }
}


export const loginUser = (username, password) => async dispatch => {
    try {
        const success = await userService.loginUser(username, password);
        dispatch(loginUserSuccess(success));
    }
    catch (ex) {
        
        console.log("Error: user could not be logged in");
        console.log(ex)
    }
}

export const loginUserSuccess = (user) => ({
    type: LOGIN_USER,
    payload: user
});