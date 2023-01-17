import './App.css';
import { Routes, Route,Navigate } from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LoginWrapper from './components/HOCs/LoginWrapper';

function App() {
  const NewHoc = LoginWrapper(Dashboard)
  return (
    <div>
      <Routes>
      <Route exact path="/" element={<Navigate replace to="/login" />}/>
      <Route exact path = "/login" element = {<Login/>}/>
      <Route exact path = "/dashboard/*" element = {<NewHoc/>}/>

      </Routes>
    </div>
  );
}

export default App;
