import { useContext, useState } from "react"
import { useParams } from "react-router"
import { AppContext } from "../Context/AppContext";
import { IRequestClient } from "../Interfaces/RequestClient";

export const ClientRequesDetailPage = () =>{

    const {id, dept_name} = useParams();
    const {getClientRequestDetail, createRequest, deleteClientRequest} = useContext(AppContext);

    const [clientRequest, setClientRequest] = useState({} as IRequestClient);

    useState(()=>{
        let cr_id = 0;
        if(id){
            cr_id = parseInt(id);
        };

        getClientRequestDetail(cr_id).then(resp => setClientRequest(resp));
    });

    console.log(clientRequest);

    const sendToAnalise = (e:any) =>{
        e.preventDefault();
        const b = {
            user_sender: 2,
            sender_dept_id: clientRequest.destination_dept_id,
            destination_dept_id: 1,
            subject: clientRequest.subject,
            body: clientRequest.body,
           
        }

        createRequest( b);
        deleteClientRequest(clientRequest.id);

    }

    return(
        <div className="client-request-detail">
            
            <p>body {clientRequest.body}</p>
            <p>subject {clientRequest.subject}</p>
            <p>client email : {clientRequest.client_email}</p>
            <p>created at {clientRequest.createdAt}</p>

            <div className="buttons-container">
                <button className="btn btn-danger">reject</button>
                <button className="btn btn-success" onClick={(e)=>sendToAnalise(e)}>send to analisys</button>
            </div>
        </div>
    )
}