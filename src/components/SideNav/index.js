import React from "react";
import "../Dashboard/style.css"
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../../services/userService";
import socket from "../../services/socketService"
import {useSelector } from "react-redux";


const SideNav = (props) =>{
    const navigate = useNavigate();
    const user = useSelector(state => state.user)
    const inGame = useSelector(state => state.ingame)
    console.log(inGame)

    console.log(user)
    console.log(inGame)
    // console.log(inGame._id)
    async function signOut(){
        if(inGame !== {}){
            if(inGame.status !== "finished"){
                socket.emit("leavematch",inGame._id,user);
            }
        }
        console.log("in side nav async")
        // dispatch(setInGame(false))
        const status = await logOutUser();
        if(status ===200){
            navigate("/login");
        }
    }
    return(
        <div className="my-nav">
            <Link to="/dashboard"><img className="avatar" src={user.avatar} alt="avatar" onClick={()=>{
                if(inGame !== {}){
                    console.log("IIIN NAV")
                    console.log(inGame.state)
                    if(inGame.status !== "finished"){
                        socket.emit("leavematch",inGame._id,user);
                    }

                }
            }}></img></Link>
            <h5 style={{justifySelf:"center"}}>{user.displayName}</h5>
            <button className="logout" type="button" onClick={signOut}>Logout</button>
        </div>
    )

}

export default SideNav