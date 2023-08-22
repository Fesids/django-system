import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../Context/AppContext"
import { IUser } from "../../Interfaces/User";
import { IProfile } from "../../Interfaces/Profile";
import { ProfileComp } from "../../Components/ProfileComp";


export const AllUsersPage = () =>{

    
    const {getAllUsers, currentUserProfile, currentUser} =  useContext(AppContext)
    const [users, setUsers] = useState([] as IUser[]);

    const [profiles, setProfile] = useState([] as IProfile[]);
    
    // RETRIEVE ALL USERS LIST
    useEffect(()=>{

        getAllUsers().then(resp => setUsers(resp));
    }, []);



    // SET CURRENT USER PROFILE
    let currentUserProfileId = 0;
    if(currentUserProfile){
        currentUserProfileId = currentUserProfile.id;
    }

    //SET CURRENT USER ID
    let currentUserId = 0;
    if(currentUser){
        currentUserId = currentUser.id
    }

 
    return(
        <div>
            <div className="all-users-title">
                <h2>add a connection</h2>
            </div>


            <table className="table table-dark">
                <caption>List of users</caption>
                <thead className="bg-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                    </tr>
                    
                </thead>

                <tbody>
                    
                    {users.filter(u => u.id !==currentUserId).map(u => <ProfileComp user_id={u.id} currentUserProfileId={currentUserProfileId}/>)}
                </tbody>
            </table>
          
        </div>
    )
}