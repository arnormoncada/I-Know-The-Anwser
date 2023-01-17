import React,{useState} from "react"
import { useDispatch } from "react-redux"
import QuestionForm from "../QuestionForm"
import "./style.css"
import { useForm, } from "react-hook-form"
import $ from 'jquery'; 
// import { createMatchAction } from "../../actions/matchActions"
import {createMatchh} from "../../services/matchService"
import { useNavigate } from "react-router-dom"
import { faL } from "@fortawesome/free-solid-svg-icons"
const CreateMatch = (props) => {
    const user = props.props.userInfo;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // var intitalArray = [];
    const [questions,AddQuestion] = useState([]);
    // const [formChecked,setFormChecked] = useState(true);
    let formChecked = true;


    function removeQuestion(id){
        console.log(questions)
        console.log(id)
        // let newForms = [...questions];
        // newForms.splice(id, 1);
        // AddQuestion(newForms)
        AddQuestion(questions.filter((question,index) => index !== id ))

    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    async function submitAll() {
        let match = {"title":"","titleImage":"","questions":[],"owner":user}
        formChecked = true;

        match.title = document.getElementById("match-input").value;
        let titleError = document.getElementById("match-title-error")
        if(match.title === ""){
            titleError.style.display = "block"
            formChecked = false
        }else{
            titleError.style.display = "none"
        }
        var file = document.querySelector('#match-image').files[0]

        let error = document.getElementById("match-image-error")
        if(file === undefined){
            error.style.display = "block"
            formChecked = false
        }
        else{
            error.style.display = "none"
            let fileBase64 = await toBase64(file);
            match.titleImage = fileBase64
        }


        var forms = document.getElementsByTagName("form");
        forms = Array.from(forms);
        forms.map((form,i) => {
            let inputList = form.getElementsByTagName("input");
            inputList = Array.from(inputList);
            let question = {"title":"","options":[]}
            inputList.map((input,index) => {
                if(index === 0){
                    question.title = input.value;
                }
                else if(index % 2 === 1){
                    console.log(i)
                    console.log(index)

                    if(input.value !== ""){
                        question.options.push(({"value":input.value,"correct":inputList[index+1].checked}))
                        let errorMessage = document.getElementById("answer" + (i+1) +(index))
                        errorMessage.style.display = "none";
                    }
                    else{
                        let errorMessage = document.getElementById("answer" + (i+1) +(index))
                        errorMessage.style.display = "block";
                        formChecked = false;
                        console.log("formchecked",formChecked)
                    }
                }
            })
            match.questions.push(question)
        })

        if($('input:radio:checked').length !== questions.length){
            alert("Each question must have one correct answer")
            formChecked = false;
        }

        if(formChecked){
        let success = await createMatchh(match)
        if(success.ok){
            alert("Your Match was successfully created!")
            navigate("/dashboard/main")
        }}        
    }


    return (
        <div>
            <div className="upper-container">
            <h2>Create match</h2>

            <label className="title-match">
                Title of the match
                <br/>
                <input id="match-input" className="text-input" type="text"/>
                <p id="match-title-error" style={{color:"red",display: "none"}}>Match must have a title</p>

            </label>

            <label className="match-image">
                Match image
                <br/>
            <input id="match-image" className="text-input" type="file" accept="image/png, image/jpeg,image/jpg" alt="input image"/>
            <p id="match-image-error" style={{color:"red",display: "none"}}>Match must have an image</p>

            </label>

            <h4>Questions</h4>
            
            <button id="add" className="add-button" type="button" onClick={() =>{ 
                // incrementCounter(counter + 1)
                AddQuestion([...questions,QuestionForm])
                }}>Add</button>
                <button className="add-button" type="button" onClick={submitAll}>Save</button>
            </div>
            {   
                questions.map((question,index) => React.createElement(question,{counter:index+1,removeItem:(id) => removeQuestion(id),key:index}))

                // questions.map((question,index) => <QuestionForm key={index}  counter = {index + 1} removeItem ={id => removeQuestion(id)}/>)
            }
        </div>
    )
}

export default CreateMatch;