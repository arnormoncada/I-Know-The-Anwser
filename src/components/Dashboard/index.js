import React,{useEffect} from "react";
import SideNav from "../SideNav";
import MainContent from "../MainContent";
import { useDispatch } from "react-redux";
import { getMatchesAction } from "../../actions/matchActions";
import { Routes, Route, useNavigate} from "react-router-dom";
import CreateMatch from "../CreateMatch";
import Match from "../Match";
import InMatch from "../InMatch";




const Dashboard = (props) => {
    const dispatch = useDispatch();

    // useEffect(() =>{
    //     dispatch(getMatchesAction())
    // })

    
    //I do the nesting here instead of using outlet because
    //it ssems like the HOC is messing up the nested routing
    // in the App file or something
    return (
        <div className="dashboard-container">
            <SideNav props = {props}/>
            <Routes>
                <Route index element ={<MainContent/>}/>
                <Route path = "/main" element = {<MainContent/>}/>
                <Route exact path = "/creatematch" element = {<CreateMatch props = {props}/>}/>
                <Route path="/main/:id" element = {<Match/>}></Route>
            </Routes>
        </div>
    )
}

export default Dashboard;