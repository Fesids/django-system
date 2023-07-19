import { useContext } from "react";
import { IRequestClient } from "../Interfaces/RequestClient";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

export interface CLRProps {
    list: IRequestClient[],
    dept_name: string
}
export const ClientRequestList = ({list, dept_name}: CLRProps) =>{
    
    
    return(
        <div className="request-list-container">
            {list.length?list.map(rc=>
                <div>
                    <h4><Link to={`/departments/${dept_name}/client_requests/${rc.id}`}>{rc.subject}</Link></h4>
                </div>):"No requests found"}
        </div>
    )
}