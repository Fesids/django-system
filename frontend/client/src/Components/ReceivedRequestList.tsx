
import { IRequest } from "../Interfaces/Request"
import { AppContext } from "../Context/AppContext"
import { Link, useParams } from "react-router-dom"

interface ReceivedRequestListProps{
    list: IRequest[],
    dept_name: string
}

export const ReceivedRequestList = ({list, dept_name}:ReceivedRequestListProps) =>{
        
        return(
            <div>
                {list.length?list.map(req => 
                    <div><Link to={`/departments/${dept_name}/requests/${req.id}`}>{req.subject}</Link></div>
                    )
                    
                    :
                    
                    <div><p>No requests</p></div>
                    
                }
            </div>
        )

}