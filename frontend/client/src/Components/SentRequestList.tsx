import { Link } from "react-router-dom"
import { IRequest } from "../Interfaces/Request"

interface ISentRequestListProps{
    list: IRequest[],
    dept_name: string

}

export const SentRequestList = ({list, dept_name}:ISentRequestListProps) =>{

    return(
        <div>
            {list.length?list.map(req =>
                <div>
                     <div><Link to={`/departments/${dept_name}/requests/${req.id}`}>{req.subject}</Link></div>
                </div>
                    )
                    
                    :

                    <p>No requrests found</p>
                    
                    }
        </div>
    )
}