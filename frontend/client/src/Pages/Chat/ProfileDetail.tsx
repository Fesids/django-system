import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { AppContext } from "../../Context/AppContext";
import { IProfile } from "../../Interfaces/Profile";

export const ProfileDetailPage = () =>{

    const {profileId} = useParams();
    const {getProfileDetail, createChat, currentUserProfile} = useContext(AppContext);
    const [profile, setProfile] = useState({} as IProfile);

    useEffect(()=>{
        let profId = 0;
        if(profileId){
            profId = parseInt(profileId);
        }
        getProfileDetail(profId).then(resp => setProfile(resp));

    });

    const handleCreateChat = (e:any) =>{
        e.preventDefault();
        let currentUserProfileId = 0;
        if(currentUserProfile){
            currentUserProfileId = currentUserProfile.id; 
        }
        createChat(currentUserProfileId, profile.id);
    }


    return(
        <div className="profile-detail-container">
            <div className="profile-detail">
               <div className="head">
                    <div className="pic"></div>
                    <div className="name">{profile.name}</div>
               </div>
               <div className="buttons-container">
                    <button onClick={(e)=> handleCreateChat(e)} className="connection-btn">+ Send message to {profile.name} </button>
                    <button className="btn btn-outline-danger">break connection</button>
               </div>

            </div>
        </div>
    )
}