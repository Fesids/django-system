import { useContext, useEffect, useState } from "react"
import { IUser, UserLoginReq } from "../Interfaces/User"
import { AppContext } from "../Context/AppContext";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";
import { LoginResponse } from "../Interfaces/Auth/LoginResponse";
import { json } from "body-parser";
import jwt, {Secret, JwtPayload, JwtPayloadUser} from 'jsonwebtoken';

declare module "jsonwebtoken"{
    export interface JwtPayloadUser extends JwtPayload{
        department: Number
    }
}


export const LoginPage = () =>{

    const [userLogin, setUserLogin] = useState({} as UserLoginReq);
    const [loginResp, setLoginResp] = useState({} as LoginResponse);


    const {login, getUser, currentUser, currentUserProfile, currentUserConnection, setCurrentUser} = useContext(AppContext);

    const navigate = useNavigate();

    const handleChange = (e:any)=>{
        setUserLogin({...userLogin, [e.target.name]: e.target.value});
    }

    const LoginHandle = (e:any, user:any) =>{
        e.preventDefault();

        const loginBody = {
            "username":userLogin.email,
            "password": userLogin.password
        }

        login(loginBody).then(
            resp => {
                setLoginResp(resp); 

            
        });  
        
        let user_dept = 0;
        console.log(user_dept)

        if(currentUser){
            user_dept = currentUser.department
            navigate("../departments");
        }
            
        

    }


    

    

    console.log(currentUser);
    console.log(currentUserProfile);
    console.log(currentUserConnection)
  
    return(
        <div className="auth-container">
            <div className="create-user-form">
                
                <div className="auth-header">
                    <h2 className="mt-2 mb-2">Login</h2>
                    <p>Enter your credentials</p>
                </div>

                <form method="post" onSubmit={(e) => LoginHandle(e, userLogin)} >
                    

                    <div className="form-group">
                        <label htmlFor="email" className="form-label mt-3">EMAIL : </label>
                        <input name="email" className="form-control" id="email" onChange={(e)=> handleChange(e)}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label mt-3">PASSWORD : </label>
                        <input name="password" className="form-control" id="password" onChange={(e)=> handleChange(e)}></input>
                    </div>

                    <input type="submit" value={"login"} className="btn-submit-auth"></input>
                    
                </form>
            </div>
        </div>
        
    )
}