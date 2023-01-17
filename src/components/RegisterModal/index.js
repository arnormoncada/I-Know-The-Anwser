import React,{useEffect, useState} from "react";
import { get } from "react-hook-form";
import { Link } from "react-router-dom";
import Modal from "../Modal";


const RegisterModal = ( {isOpen,close,onSubmit} ) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(()=>{
        if(!isOpen){
            setName("")
            setUsername("")
            setPassword("")
        }
    },[name,username,password,isOpen])
    return (
        <Modal isOpen={isOpen} close = {close} onSubmit = {() => {
            let the_name = document.getElementById("name")
            let the_username = document.getElementById("username")
            let the_password = document.getElementById("password1")
            document.getElementById("username1").style.display= "none";
            the_name.style.display = "none";
            the_username.style.display = "none";
            the_password.style.display = "none";


            if(name === "" || name.length < 3){
                // let the_name = document.getElementById("name")
                the_name.style.display = "block";
            }
            if(username === ""){
                // let the_username = document.getElementById("username")
                the_username.style.display = "block";
            }
            if(password === "" || password.length < 8){
                // let the_password = document.getElementById("password1")
                the_password.style.display = "block";
            }

            if(name.length >= 3 && username !== "" && password.length >= 8){
                onSubmit({username:username,displayName:name,password:password})
                setName("")
                setUsername("")
                setPassword("")
            }

            }}>
            <form className="form form-horizontal">
            <div className="form-group">
                <label htmlFor="Name">Full name</label>
                <input
                    type="text"
                    className="form-control"
                    name="Full name"
                    value={ name }
                    onChange={ e => setName(e.target.value) }/>
                    
                </div>
                <p id = "name" style={{display:"none",color:"red"}}>Full name is required and must be 3 characters minimum</p>
            <div className="form-group">
                <label htmlFor="Username">Username</label>
                <input
                    type="text"
                    className="form-control"
                    name="Username" 
                    value={ username }
                    onChange={ e => setUsername(e.target.value) }/>
            </div>
            <p id = "username" style={{display:"none",color:"red"}}>Username is required</p>
            <p id = "username1" style={{display:"none",color:"red"}}>Username is already taken</p>


            <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="Password"
                    value={ password }
                    onChange={ e => setPassword(e.target.value) }/>
            </div>
            <p id = "password1" style={{display:"none",color:"red"}}>Password is required and must be longer than 8 characters</p>

        </form>
    </Modal>

    )
}

export default RegisterModal;