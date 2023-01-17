import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams,Link } from "react-router-dom";
import { setInGame } from "../../actions/inGameActions";
import socket from "../../services/socketService"

const MatchLobby = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const matches = useSelector(state => state.matches)
    const match = matches.filter(match => id === match._id)
    const user = useSelector(state => state.user)
    // const ingame = useSelector(state => state.ingame)
    // console.log("inlobby",ingame)
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(setInGame(match[0]))
    })


    if(match[0].owner.id !== user.id){
        //if you are not owner you dont get the start button
        return(
            <div>
                <div className="match-header-container">
                <h1>Waiting for players to join</h1>
                <button className="match-button" type="button" onClick={()=>{
                    console.log("in lobby leave button")
                    socket.emit("leavematch",id,user);
                    navigate("/dashboard");
                    }}>Leave</button>
                </div>
                <div className="match-containerr">
                    {match[0].players.map(player => (
                        <div className="player-container">
                        <img src={player.avatar} alt="avatar"></img>
                        <h4>{player.username} is in the house!</h4>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    else{
    return(
        <div>
            <div className="match-header-container">
            <button className="match-button" type="button" onClick={()=>{
                socket.emit("leavematch",id,user);
                navigate("/dashboard");
                }}>Leave</button>
            <h1>Waiting for players to join</h1>
                <button className="match-button" id="start" type="button" onClick={()=> {
                    if(match[0].players.length >= 2){
                        socket.emit("startmatch",id) 
                    }
                }}>Start</button>
            </div>
            <div className="match-containerr">
                    {match[0].players.map(player => (
                        <div className="player-container">
                            <img className="player-img" src={player.avatar} alt="avatar"></img>
                            <h4>{player.username} is in the house!</h4>
                        </div>
                    ))}
            </div>
        </div>
    )
    }
}

export default MatchLobby;