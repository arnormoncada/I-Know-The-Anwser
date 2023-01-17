import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMatchesAction } from "../../actions/matchActions";
import "../Dashboard/style.css"
import "./style.css"
import { setInGame } from "../../actions/inGameActions";


// import { useEffect } from "react";

const MainContent = (props) => {
    const dispatch = useDispatch();
    const allMatches = useSelector(state => state.matches);
    const navigate = useNavigate();
    useEffect(() =>{
        dispatch(getMatchesAction())
        dispatch(setInGame({}))
    },[])
    function handleNavToMatch(e){
        e.preventDefault()
        console.log(e.currentTarget)
        let clickedMatch = allMatches.filter(match => match._id === e.currentTarget.id)[0]
        if(clickedMatch.players.length < 4 && clickedMatch.status === "not-started"){
            console.log("in if")
            // dispatch(setInGame(true));
            navigate("main/" + clickedMatch._id)

        }
    } 
    console.log("main content: ")
    return (
        <div className="my-main-content">
            <div className="header">
                <h1 className="dashboard">Dashboard</h1>
                <h5 className="matchrooms">Matchrooms</h5>
                <Link className="button-containerr" to="/dashboard/creatematch"><button className="create-button" type="button">Create</button></Link>
            </div>
            {allMatches.map((match,index) => (
                // <Link to={"main/" + match._id} >
                <div key={index} className="match-container">
                    <div id= {match._id} className="match-grid-container" onClick={(e)=>handleNavToMatch(e)}>
                        <h5 className="title">{match.title}</h5>
                        <img className="match-img" src={match.titleImage} alt="Match"></img>
                        <div className="ps-container">
                        <h6 className="player-count">{match.players.length}/4</h6>
                        <h6 className="status">{match.status}</h6>
                    </div>
                    </div>
                </div>
                // </Link>
            ))}
        </div>
    )
}

export default MainContent;