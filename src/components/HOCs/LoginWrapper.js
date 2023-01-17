import React from "react";
import { loginUserSuccess } from "../../actions/userActions";
import { getUserInfo } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



const LoginWrapper = (WrappedComponent) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return class extends React.Component{
        state = {
            user: {},
            isHidden: true
        }
    
        async componentDidMount(){
            var user;
            try{
                user = await getUserInfo();
            }catch{
                user = false
            }
            console.log(user)
            if(!user){
                //redirect if he is not authenticated
                navigate("/login");
                // this.props.history.push('/login ');
            }else{
                dispatch(loginUserSuccess(user));
                this.setState({user,isHidden: false})
            }
        }
        render(){
            const {user,isHidden} = this.state;
            const renderTemplate = isHidden ? <></>: <WrappedComponent userInfo = {user} {...this.props}/>
            return renderTemplate;
        }
    }
}


export default LoginWrapper;