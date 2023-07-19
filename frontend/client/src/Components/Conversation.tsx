import { useContext, useEffect, useState } from "react"
import { IConnection } from "../Interfaces/Connection"
import { IProfile } from "../Interfaces/Profile"
import { AppContext } from "../Context/AppContext"
import { Link } from "react-router-dom"

interface ConversationProp{
    data: IConnection
}

export const Conversation = ({data}: ConversationProp) =>{

    const [profile, setProfile] = useState({} as IProfile);
    const {getProfileDetail} = useContext(AppContext);


    useEffect(()=>{
        let prof = 0;

        if(data.profile){
            prof = data.profile
        }
        getProfileDetail(data?.profile).then(resp => setProfile(resp));
    })

    return(
      
        <div className="friends">
            <div className="pic">
                <img src="" alt=""></img>
            </div>
            <div className="name">
                <h5><Link to={`/chat/detail/${profile.id}`}>{profile.name}</Link></h5>
                <p>How are you doing today</p>
            </div>
            <div className="time_new_msg">
                <p>7:30am</p>
                <div className="msg">0</div>
            </div>
        </div>
    )
}