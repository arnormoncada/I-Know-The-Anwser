import React, { useCallback, useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./style.css"
import $ from 'jquery'; 
import { setInGame } from "../../actions/inGameActions";



const FinishedMatch = () =>{
    const matches = useSelector(state => state.matches);
    const {id} = useParams();
    const match = matches.filter(match => id === match._id)[0];
    const [playerPoints,setPlayerPoints] = useState([]);
    const dispatch = useDispatch();


    const getPointsPerPlayer =  () => {
        let playerPoints = [];
        //hax fall til að reikna stiginn per player
        let timePerQuestion = 10;
        //ýtrar yfir player listann
        for(let i = 0; i < match.players.length; i++){
            let totalPoints = 0;
            //ýtrar yfir answers listann
            for(let j = 0; j < match.answers.length;j++){
                //tjékkar hvort player id er það sama og user id á honum sem var með þetta svar
                if(match.players[i].id === match.answers[j].user.id){
                    console.log(match.questions[(match.answers[j].question -1)].options[match.answers[j].answer].correct)
                    //indexar in í question options listann til að athuga hvort svarið sé true
                    if(match.questions[(match.answers[j].question -1)].options[match.answers[j].answer].correct){
                        //bætir við í total points
                        // (𝑀𝑎𝑥𝑖𝑚𝑢𝑚 𝑡𝑖𝑚𝑒 (𝑠) − 𝑇𝑖𝑚𝑒 𝑒𝑙𝑎𝑝𝑠𝑒𝑑 (𝑠)) * 10, e.g. (10 - 1) * 10 = 90
                        totalPoints += (timePerQuestion - (10-match.answers[j].secondsLeft)) * 10;
                    }
                }
            }
            //pushum svo player id og stigunum hans í lista til þess að nota á eftir
            playerPoints.push({"pId":match.players[i].id,"points":totalPoints})
        }
        //sort them by their total points
        playerPoints.sort((a, b) => parseFloat(b.points) - parseFloat(a.points))
        return playerPoints
    }
    useEffect(()=>{
        let returnedPlayerPoints = getPointsPerPlayer();
        setPlayerPoints(returnedPlayerPoints);
        dispatch(setInGame(match))

    },[match])
    function addToPodium(index,avatar){
        console.log(avatar)
        console.log("index: ",index)
        console.log($("#podium-one").children().length)
        if(index === 0) {
            if(($("#podium-one").children().length < 2)){
                console.log("after if")

                let img = $("<img></img>")
                $("#podium-one").prepend(img)
                img.attr("src",avatar)
                img.css({"width":"160px","height":"160px","border-radius":"50%","margin-bottom":"10px"})
        }}
        if(index === 1) {
            if(($("#podium-two").children().length < 2)){

            let img = $("<img></img>")
            $("#podium-two").prepend(img)
            img.attr("src",avatar)
            img.css({"width":"160px","height":"160px","border-radius":"50%","margin-bottom":"10px"})
        }}
        if(index === 2) {
            if(($("#podium-three").children().length < 2)){
            let img = $("<img></img>")
            $("#podium-three").prepend(img)
            img.attr("src",avatar)
            img.css({"width":"160px","height":"160px","border-radius":"50%","margin-bottom":"10px"})

        }}

    }




    return(
        <div className="summary-container">
            <h1>Game Summary</h1>
            <div className="podium-container">
                <div id="podium-two"><div className="podium-two"><h3>2</h3></div></div>
                <div id="podium-one"><div className="podium-one"><h3>1</h3></div></div>
                <div id="podium-three"><div className="podium-three"><h3>3</h3></div></div>
            </div>
            <div className="score-board-container">
                <h5>scoreboard</h5>
                <div className="score-board">
                    {playerPoints.map((player,index) => {
                        let matchPlayer = match.players.find(x => x.id === player.pId)
                        addToPodium(index,matchPlayer.avatar);
                        return(
                            <div className="scoreboard-entry">
                                <p>#{index + 1 }</p>
                                <img className="scoreboard-img" src={matchPlayer.avatar} alt="avatar"/>
                                <p>{matchPlayer.username}</p>
                                <p className="scoreboard-points">{player.points} pts</p>
                            </div>
                        )
                    })}

                </div>
            </div>



        </div>
    )
}

export default FinishedMatch;