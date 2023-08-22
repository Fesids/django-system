import { useContext, useEffect, useState } from "react"
import { UserRegisterReq, UserRole } from "../Interfaces/User"
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router";
import axios from  "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const RegisterPage = () =>{

    const [regUser, setRegUser] = useState({} as UserRegisterReq);
    const {registerExternal, getCookie, register} = useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (e:any) =>{
        setRegUser({...regUser, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        getCookie()
    })

    const regBody: UserRegisterReq = {
        username: regUser.username,
        email: regUser.email,
        password: regUser.password,
        re_password: regUser.re_password
        //uRole: UserRole.EXTERNAL_USER
    }

    const Register = (e:any, user:any) =>{
        e.preventDefault()
        try{
            registerExternal(regBody);
            //navigate("../login", {replace:true})
        } catch(err){

        }
    }

    console.log(regBody)


    return(
        <div className="auth-container">
            <div className="create-user-form">
           
                <div className="auth-header">
                    <h2 className="mt-2 mb-2">Register</h2>
                    <p>Enter your credentials</p>
                </div>


                <form method="post" onSubmit={(e) => Register(e, regBody)}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label mt-3">USERNAME : </label>
                        <input name="username" className="form-control" id="username" onChange={(e)=> handleChange(e)}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label mt-3">EMAIL : </label>
                        <input name="email" className="form-control" id="email" onChange={(e)=> handleChange(e)}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label mt-3">PASSWORD : </label>
                        <input name="password" className="form-control" id="password" onChange={(e)=> handleChange(e)}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="re_password" className="form-label mt-3">RE_PASSWORD : </label>
                        <input name="re_password" className="form-control" id="password" onChange={(e)=> handleChange(e)}></input>
                    </div>

                    <input type="submit" value={"register"} className="btn-submit-auth"></input>
                </form>

                
            </div>
        </div>
        
    )
}