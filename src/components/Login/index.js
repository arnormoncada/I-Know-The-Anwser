import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import "./style.css";
import { loginUser, registerUser } from "../../actions/userActions";
import RegisterModal from "../RegisterModal";
import { loginUserr } from "../../services/userService";
import { registerUserr } from "../../services/userService";
import { getUserInfo } from "../../services/userService";



const Login = () => {
    const dispatch = useDispatch();
    // let produseructs = useSelector(state => state.user);d
    const [isOpen, setIsOpen] = useState(false);
    const[userInfo,setUserInfo] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        (async function (){
            const resp = await getUserInfo();
            setUserInfo(resp);
        }())
        console.log(userInfo)
        if(!userInfo){
            
        }else{
            navigate("/dashboard")
        }
    })

    async function handleLogin (){
        let username = document.getElementById("login").value
        let password = document.getElementById("password").value
        // dispatch(loginUser(username,password));
        const loggedIn = await loginUserr(username,password);

        //if server does not return an error status go to dashboard;
        if(loggedIn < 400){
            document.getElementById("wrong").style.display = "none";
            navigate("/dashboard")

        }
        else{
            document.getElementById("wrong").style.display = "block";

        }
    }   

    return (
        <div className="containerr">
            <h1>I KNOW THE ANSWER</h1>
            <div className="login-container">
                <input id="login" type="text" className="login-input" placeholder="enter your username"></input>
                <input id="password" type="password" className="login-input" placeholder="enter your password"></input>
                <p id="wrong" style={{color:"red",display:"none"}}>Username or Password is incorrect</p>
            </div>
            <div className="button-container">
                <button className="buttons" type="button" onClick={()=>setIsOpen(true)}>Register</button>
                <button className="buttons" type="button" onClick={() => handleLogin()}>Login</button>
            </div>
            <RegisterModal isOpen={isOpen} close = {() => {setIsOpen(false)}} onSubmit = {async user =>{
                const registered = await registerUserr(user.username,user.displayName,user.password);
                if(registered === 201){
                    setIsOpen(false);
                }
                else if(registered === 500){
                    document.getElementById("username1").style.display = "block";
                    // alert("Username already exists")
                }
                else{
                    console.log("did not register")
                }
            }}></RegisterModal>
        </div>
    )
}


export default Login;