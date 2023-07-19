import { useContext, useEffect, useState } from "react"
import { IUser, UserLoginReq } from "../Interfaces/User"
import { AppContext } from "../Context/AppContext";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";
import { LoginResponse } from "../Interfaces/Auth/LoginResponse";

export const LoginPage = () =>{

    const [userLogin, setUserLogin] = useState({} as UserLoginReq);
    const [loginResp, setLoginResp] = useState({} as LoginResponse);

    const [csrfToken, setCsrfToken] = useState("");
    const [testeUser, setTesteUser] = useState({} as any);

    const [currentCookie, setCurrentCookie] = useState("");
    const [currentLoginUser, setCurrenLoginUser] = useState({} as any);

    const {login, getUser, currentUser} = useContext(AppContext);

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

        login(e, loginBody).then(
            resp => {setLoginResp(resp); 
               
                getUser(currentCookie).then(resp => setCurrenLoginUser(resp));
                /*navigate("../", {replace:true})*/}
        );       

    }

    useEffect(()=>{
        if(loginResp.access_token){
            Cookie.set("access_token", loginResp.access_token);
            const cookie = Cookie.get("access_token");
            if(cookie){
                setCurrentCookie(cookie);
            
            }
            //getUser(cookie).then(resp => setCurrenLoginUser(resp));
        }
        /*if(userBody.token){
            Cookie.set("auth_cookie", userBody.token);
        }*/
    }, []);

    // SET REFRESH TOKEN
    useEffect(()=>{
        if(loginResp.refresh_token){
            Cookie.set("refresh_token", loginResp.refresh_token);
        
        }

    });

    // SET ACCESS COOKIE
    /*useEffect(()=>{
        const cookie = Cookie.get("access_token");
        if(cookie){
            setCurrentCookie(cookie);
        }

        setCurrentCookie(" ");
    }, [])*/


    console.log(currentCookie);
    //console.log(currentLoginUser);
    console.log(currentUser)

    
    return(
        <div className="create-user-form">
            <h2 className="mt-2 mb-2">Login</h2>
            <p>Enter your credentials</p>
            <form method="post" onSubmit={(e) => LoginHandle(e, userLogin)} >
                

                <div className="form-group">
                    <label htmlFor="email" className="form-label mt-3">EMAIL : </label>
                    <input name="email" className="form-control" id="email" onChange={(e)=> handleChange(e)}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label mt-3">PASSWORD : </label>
                    <input name="password" className="form-control" id="password" onChange={(e)=> handleChange(e)}></input>
                </div>

                <input type="submit" value={"login"}></input>
            </form>
        </div>
    )
}