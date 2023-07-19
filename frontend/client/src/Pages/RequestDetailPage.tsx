import { useContext, useState } from "react"
import { useParams } from "react-router"
import { AppContext } from "../Context/AppContext";
import { IRequestClient } from "../Interfaces/RequestClient";
import { IRequest } from "../Interfaces/Request";
import { IDepartment } from "../Interfaces/Department";


export const RequesDetailPage = () =>{

    const {id, dept_name} = useParams();
    const {getClientRequestDetail, getRequestDetail, updateDestIdAndSenderId, getDepartmentList} = useContext(AppContext);

    //const [clientRequest, setClientRequest] = useState({} as IRequestClient);
    const [request, setRequest] = useState({} as IRequest);
    const [departments, setDepartments] = useState([] as IDepartment[]);

    useState(()=>{
        let cr_id = 0;
        if(id){
            cr_id = parseInt(id);
        };

        getRequestDetail(cr_id).then(resp => setRequest(resp));
    });

    // set departments
    useState(()=>{
        getDepartmentList().then(resp => setDepartments(resp));
    })

    console.log(departments);

    const testeWindow = () =>{
        //window.open("teste.html", "", h)
    }

    return(
        <div className="client-request-detail">
            
            <p>body {request.body}</p>
            <p>subject {request.subject}</p>
           
            <p>created at {request.created_at}</p>

            <div className="buttons-container">
                <button className="btn btn-danger">reject</button>
                <button className="btn btn-success" onClick={testeWindow}>send to analisys</button>
            </div>
        </div>
    )
}