import { useContext, useEffect, useState } from "react"
import { IProfile } from "../Interfaces/Profile"
import { IUser } from "../Interfaces/User"
import { AppContext } from "../Context/AppContext"
import { useSearchParams } from "react-router-dom"
import { IConnection } from "../Interfaces/Connection"



interface ProfileCompProps{
  
   data?:IProfile,
   user_id:number,
   currentUserProfileId: number

}


export const ProfileComp =({user_id, currentUserProfileId}:ProfileCompProps)=>{

    const {getProfileDetail, getProfileUserId, getConnectionDetailByProfileId, currentUser, currentUserProfile, currentUserConnection, addConnection, createChat} = useContext(AppContext);

    const [profile, setProfile] = useState({} as IProfile);

    const [connection, setConnection] = useState({} as IConnection);
    
    const handleAddFriend = (e:any) =>{

        e.preventDefault();
        
        addConnection(currentUserProfileId, connection.id);
       
       
        
    }

    useEffect(()=>{
        let prof_id = 0;
        if(profile.id){
            prof_id = profile.id;
            getConnectionDetailByProfileId(prof_id).then(resp => setConnection(resp))
        }
       
    })



    useEffect(()=>{
        getProfileUserId(user_id).then(resp => setProfile(resp));
    }, []);

    
    return(
        <>
            {profile?
            <tr >
                <td>{profile.id}</td>
                <td>{profile.name} - <p className="btn btn-dark" onClick={(e)=> handleAddFriend(e)}>+ add</p></td>
            </tr>
            
    
            :
            
            <tr>
                <td>not found</td>
                <td>not found</td>
            </tr>
            }
        </>
       
        
    )
}