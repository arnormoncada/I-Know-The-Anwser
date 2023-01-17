import { REGISTER_ENDPOINT,LOGIN_ENDPOINT, GET_USER_INFO,LOGOUT_USER } from "../constants";

export const userService = () => {
    return {
        registerUser: (username,displayName,password) =>{ 
            fetch(REGISTER_ENDPOINT,{
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({"username": username, "displayName": displayName,"password":password})}).then(resp => resp.json()).then(d => d)},
        loginUser: (username,password) => fetch(LOGIN_ENDPOINT,{
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({"username": username,"password":password})}).then(resp => resp.json()).then(d => d),
        // TODO get bubble product by id
    }
};


export const registerUserr = async (username,displayName,password) => {
    const result = await fetch(REGISTER_ENDPOINT,{
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({"username": username, "displayName": displayName,"password":password})})
    return result.status;
}


export const logOutUser = async() => {
    const result = await fetch(LOGOUT_USER,{
        method: "POST",
        credentials: 'include'})
        return result.status;
}
export const loginUserr = async(username,password) => {
    const result = await fetch(LOGIN_ENDPOINT,{
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({"username": username,"password":password})})
        // console.log(result.status);
        return result.status;
}

export const getUserInfo = async () =>{
    //returns true if ok else false
    const result = await fetch(GET_USER_INFO,{credentials:'include'});
    console.log(result)
    if(result.ok){
        return result.json();
    }
    else{return;}

}

export const checkCredentials = async () =>{
    //returns true if ok else false
    const result = await fetch(GET_USER_INFO,{credentials:'include'})
    return result.ok;
}
export default userService();