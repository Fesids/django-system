import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react"

export const Teste = () =>{

    const [token, setToken] = useState("");
    const [user, setUser] = useState({} as any)

    const getToken = ():string =>{
        const cookie = Cookies.get("access_token");
        if(cookie){
            return cookie;
        }
        
        return "";
    };

    useEffect(()=>{
        setToken(getToken)
    },[]);

    console.log(token);

    const getUser = async () =>{
        const resp = await axios.get("api/auth/user", {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        });

        setUser(resp.data);
        
    }

    console.log(user);


    return(
        <div>
            teste
            <button onClick={getUser} >
                teste
            </button>
        </div>
    )
}