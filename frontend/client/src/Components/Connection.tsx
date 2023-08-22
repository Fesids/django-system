import { Link } from "react-router-dom"
import { IProfile } from "../Interfaces/Profile"
import { IConnection } from "../Interfaces/Connection"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"

export interface ConnectionProps{
    data: IConnection
}
export const Connection = ({data}: ConnectionProps) =>{

    const [profile, setProfile] = useState({} as IProfile);
    const {getProfileDetail} = useContext(AppContext);

    useEffect(()=>{
        let connectionId = 0;
        if(data){
            connectionId = data.profile
        }
        getProfileDetail(connectionId)
        .then(resp => setProfile(resp));
        

    })

    return(
        <div className="connection-container">
             <div className="pic">
                <img src="" alt=""></img>
            </div>
            <div className="name">
                <Link to={`/chat/connections/detail/${profile.id}`}><h5 className="link-chat">{profile.name}</h5></Link>
                
            </div>
           
        </div>
    )
}