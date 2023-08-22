import { useContext } from "react"
import { AppContext } from "../../Context/AppContext"
import { IProfile } from "../../Interfaces/Profile";
import { IConnection } from "../../Interfaces/Connection";
import { Connection } from "../../Components/Connection";


export const AllConnectionPage = () =>{

    const {currentUserProfile} = useContext(AppContext);
    
    let connectionsList = [] as Array<IConnection>;

    if(currentUserProfile){
        connectionsList = currentUserProfile.connections
    }

    return(
        <div className="your-connections">
            <div className="your-connections-header">
                <h2>Your Connections</h2>
            </div>
            <div className="connectionslist-container">
             {connectionsList?.map(fr => <Connection data={fr}/>)}
            </div>
        </div>
        
    )
}