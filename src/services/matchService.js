import { GET_MATCHES,CREATE_MATCH } from "../constants";


const matchService = () => {
    return {
        getMatches: () => fetch(GET_MATCHES,{credentials:"include"}).then(resp => resp.json()).then(d => d),
        createMatch: (match) => {
            // console.log("in service")
            // console.log(match)
            return fetch(CREATE_MATCH,{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            credentials:"include",
            body: JSON.stringify(match)})}
        
    }
};

export const createMatchh = async (match) => {
    const result = await fetch(CREATE_MATCH,{
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            credentials:"include",
            body: JSON.stringify(match)})
    return result;
}
export default matchService();