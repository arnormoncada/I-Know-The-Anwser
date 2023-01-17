import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams,Link } from "react-router-dom";
import { getMatchesAction, getMatchSuccess } from "../../actions/matchActions";
import socket from "../../services/socketService";
import "./style.css";
import MatchLobby from "../MatchLobby";
import InMatch from "../InMatch";
import FinishedMatch from "../FinishedMatch";

const Match = () => {
    const navigate = useNavigate();
    // console.log(props.props)
    const dispatch = useDispatch();
    const {id} = useParams();
    const matches = useSelector(state => state.matches)
    const user = useSelector(state => state.user)
    console.log("Match: ")


    socket.emit("joinmatch",id,user);

    useEffect(()=>{
        socket.on("joinmatch",user =>{
            // console.log("in join match")
            dispatch(getMatchesAction(matches.map( match => {
                if(match._id === id) {
                    return{
                        ...match,
                        players: [...match.players,user]
                    }
                }
                return match
            })))
        })

        socket.on("leavematch",user => {
            dispatch(getMatchSuccess(
                matches.map( match => {
                    if(match._id === id){
                        return{
                            ...match,
                            players: match.players.filter(player => player.id !== user.id)
                        }
                    }
                    return match
                })
            ))
        })

        socket.on('startmatch', () => {
            dispatch(getMatchesAction(matches.map(match => {
                if(match._id === id){
                    return{
                        ...match,
                        status: "started"
                    }
                }
                return match
            })))
        })
        socket.on("finishedgame",match =>{
            console.log("in socketon")
            console.log(match)
            dispatch(getMatchesAction(matches.map( match => {
                if(match._id === id) {
                    return{
                        match       
                    }
                }
                return match
            })))
        })
        return () => {
            socket.off("joinmatch");
            socket.off("leavematch");
            socket.off("startmatch");
            socket.off("finishedgame"); 

        }
    },[matches,dispatch,id])

    const match = matches.filter(match => id === match._id)

    function renderCurrentState(match){
        // console.log(match.status)
        switch (match[0].status) {
            case "not-started":
                return (<MatchLobby/>)

            case "started":
                    return (<InMatch/>)
            case "finished":
                return (<FinishedMatch/>)
            default:
                break;
        }

    }

    return (renderCurrentState(match))
}

export default Match;