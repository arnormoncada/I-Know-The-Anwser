import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../services/socketService";
import "./style.css";
import { getMatchesAction,getMatchSuccess } from "../../actions/matchActions";
import $ from 'jquery'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const InMatch = () =>{
    const [timer,setTimer] = useState(10);
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [answered,setAnswered] = useState([]);
    const [hasAnswered,setHasAnswered] = useState(false);
    const [showCorrect,setShowCorrect] = useState(false)
    const dispatch = useDispatch()
    // console.log(answered)

    const matches = useSelector(state => state.matches);
    const user = useSelector(state => state.user)
    const {id} = useParams();
    const match = matches.filter(match => id === match._id)

    useEffect(() => {
        socket.on("answer",user =>{
            // console.log("user",user)
            setAnswered([...answered,user]);
        })
        socket.on("updatetimer",counter =>{
            // console.log("counter",counter)
            setTimer(counter);
        })

        socket.on("nextquestion",currentQuestionn =>{
            removeAnwseres();
            dispatch(getMatchSuccess(
                matches.map( match => {
                    if(match._id === id){
                        return{
                            ...match,
                            currentQuestion: currentQuestionn
                        }
                    }
                    return match
                })
            ))
            setCurrentQuestion(currentQuestionn-1);
            setAnswered([]);
            setHasAnswered(false)
            setShowCorrect(false)

        })

        socket.on("answers",item =>{
            handleAnwseres(item);
            setShowCorrect(true);
            
        })

    return () => {
        socket.off("answer");
        socket.off("updatetimer");
        socket.off("nextquestion");
        socket.off("answers");

    }
    },[timer,answered,dispatch,id,matches,hasAnswered,showCorrect])

    function handleAnwseres(answeres){
        console.log(answeres)
        for(let i = 0; i<answeres.length;i++){
            var img = $("<img></img>")
            $( "#answer-box" + answeres[i].answer ).append(img);
            img.attr("src",answeres[i].user.avatar)
            img.css({"width":"40px","height":"40px","border-radius":"50%","display":"inline-block","margin":"5px"})
        }
    }
    function removeAnwseres(){
        $(".answer-boxes").empty()
    }
    function handleAnwser(e){
        if(!hasAnswered){
            socket.emit("answer",match[0],user,parseInt(e.currentTarget.id),timer);
            setHasAnswered(true);
        }
    }

    console.log(match[0].currentQuestion)
    return(
        <div>
            <div className="in-match-header">
            <h3 className="question-counter">Question {currentQuestion + 1}</h3>
            <h4 className="question-title">{match[0].questions[currentQuestion].title}</h4>
            <div className="answer-showcase">{answered.map(answeree => {
                return(
                    <img src={answeree.avatar} alt="avatar"/>
                )
            })}</div>
            <div className="timer">
                <p>{timer}</p>
            </div>

        </div>
            <div className="question-list">
                {match[0].questions[currentQuestion].options.map((option,index) => {
                    if(option.correct){
                        return(
                        
                        <div id = {index}  className="answer-option" onClick={ e => handleAnwser(e)}>
                            <h4 style={{justifySelf:"center",alignSelf:"center"}}>{option.value}</h4>
                            <i style={{display: showCorrect ? 'block' : 'none' }} className="fas fa-check-circle correct-icon"></i>
                            <label className="answer-boxes" id ={"answer-box" + index}></label>
                        </div >)
                    }
                    else{
                    return  (
                        <div id = {index} className="answer-option" onClick={ e => handleAnwser(e)}>
                            <h4>{option.value}</h4>
                            <div className="show-anwser-container"></div>
                            <label className="answer-boxes" id ={"answer-box" + index}></label>

                        </div >
                    )}
                    })}
            </div>
        </div>
    )
}

export default InMatch;