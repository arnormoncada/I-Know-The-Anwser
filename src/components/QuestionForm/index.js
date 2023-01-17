import React from "react"
import { useForm } from "react-hook-form";
import "./style.css"
const MatchForm = ( {counter,removeItem} ) => {

    // console.log(counter)
    
    return (
        <>
            <h3>Question {counter}</h3>
            <form id={"form" + counter} className="question-form">
                <label className="input-container">
                    Title of the question
                    <br/>
                    <input className="text-input" defaultValue="" type="text"/>
                </label>
                <br/>
                <label className="input-container">
                    Answer 1
                    <br/>
                    <input defaultValue="" className="text-input" type="text"/>
                    <p id={"answer" + counter + "1"} style={{color:"red",display: "none"}}>This field is required</p>
                    <label>
                        Right answer?
                        <br/>
                        <input name="correctAnswer" type="radio"/>
                    </label>
                </label>
                <label  className="input-container">
                    Answer 2
                    <br/>
                    <input defaultValue="" className="text-input" type="text"/>
                    <p id={"answer" + counter + "3"} style={{color:"red",display: "none"}}>This field is required</p>
                    <label>
                        Right answer?
                        <br/>
                        <input name="correctAnswer" type="radio"/>
                    </label>
                </label>
                <label className="input-container">
                    Answer 3
                    <br/>
                    <input defaultValue="" className="text-input" type="text"/>
                    <p id={"answer" + counter + "5"} style={{color:"red",display: "none"}}>This field is required</p>
                    <label>
                        Right answer?
                        <br/>
                        <input name="correctAnswer" type="radio"/>
                    </label>
                </label>
                <label className="input-container">
                    Answer 4
                    <br/>
                    <input defaultValue="" className="text-input" type="text"/>
                    <p id={"answer" + counter + "7"} style={{color:"red",display: "none"}}>This field is required</p>
                    <label>
                        Right answer?
                        <br/>
                        <input name="correctAnswer" type="radio"/>
                    </label>
                </label>
                <button className="remove-button" type="button" onClick={() => removeItem(counter-1) }>Remove</button>
            </form>
            </>
    )
}

export default MatchForm;