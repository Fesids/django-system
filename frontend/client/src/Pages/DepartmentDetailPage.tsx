import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"
import { IDepartment } from "../Interfaces/Department";
import { useParams } from "react-router";
import { DepartmentComp } from "../Components/DepartmentComp";
import { IUser } from "../Interfaces/User";
import { IRequestClient } from "../Interfaces/RequestClient";
import { ClientRequestList } from "../Components/ClientRequestList";
import { IRequest } from "../Interfaces/Request";
import { ReceivedRequestList } from "../Components/ReceivedRequestList";
import { Link } from "react-router-dom";
import { SentRequestList } from "../Components/SentRequestList";


export const DepartmentDetail = () =>{
    const [department, setDepartment] = useState({} as IDepartment);
    const [users, setUsers] = useState([] as IUser[]);
    const {id} = useParams();
    const {getDepartment, getUsersByDeptId, getAllClientRequest, getReceivedRequests, getSentRequests} = useContext(AppContext);

    const [clientRequestList, setClientRequestList] = useState([] as IRequestClient[]);
    const [deptRequestReceived, setDeptRequestReceived] = useState([] as IRequest[]);
    const [deptRequestSent, setDeptRequestSent] = useState([] as IRequest[]);
    const [showCRList, setShowCRList] = useState(false);
   // const [reqReceivedList, setReqReceivedList] = useState([] as IRequest[]);
    const [showReceveivedReqList, setShowReceivedReqList] = useState(false);
    const [showSentReqList, setShowSentList] = useState(false);


    // ##### SET DEPARTENT
    useEffect(() =>{
        let dep_id = 0;
        if(id){
            dep_id = parseInt(id);
        }
        getDepartment(dep_id).then(resp => setDepartment(resp));
    }, []);


    // SET CLIENT REQUEST
    useEffect(()=>{
        let dep_id = '';
        if(id){
            dep_id = id;
        }
        getAllClientRequest(dep_id).then(resp => setClientRequestList(resp));
    }, []);

    //* SET RECEIVED REQUEST
    useState(()=>{
        let dep_id = 0;
        if(id){
            dep_id = parseInt(id);
        }

        getReceivedRequests(dep_id).then(res => setDeptRequestReceived(res));
        
    })

    const handleClientRequestClick = () =>{
        setShowCRList(!showCRList);
    }

    const handleReceivedRequestClick = () =>{
        setShowReceivedReqList(!showReceveivedReqList);
    }

    const handleSentRequestList = () =>{
        setShowSentList(!showSentReqList);
    }


    useState(()=>{
        let dep_id = 0;
        if(id){
            dep_id = parseInt(id);
        }

        getSentRequests(dep_id).then(resp => setDeptRequestSent(resp));
    })
    //console.log(deptRequestSent);
    console.log(department)

    return(
        <div>
            {id}
            <DepartmentComp {...department}/>

            <div className="mt-4 mb-4 border">
                {users.map(u =>
                    <div>
                        <h3>{u.username}</h3>
                        <p>{u.email}</p>
                    </div>
                    
                )}
            </div>

            <div className="requests-content-container">
                <div className="request-container border">
                    <div className="client-request-header">CLIENT REQUEST</div>
                    <div>
                        <button value={"sales"} onClick={handleClientRequestClick}>new</button>
                    </div>
                    {showCRList?<ClientRequestList list={clientRequestList} dept_name={department.department_name}/>:""}
                </div>

                <div className="request-container border">
                    <div className="client-request-header">RECEIVED REQUESTS</div>
                    <div>
                        <p><button value={"sales"} onClick={handleReceivedRequestClick} className="btn btn-primary">all requests</button>
                        <Link to={`/departments/${department.id}/request/new`} className="btn btn-success">+ add request</Link></p>
                    </div>
                    
                   
                    {showReceveivedReqList?<ReceivedRequestList list={deptRequestReceived} dept_name={department.department_name}/> :""}
                </div>

                <div>
                    <div className="client-request-header">SENT REQUESTS</div>
                    <div>
                        <p><button value={"sales"} onClick={handleSentRequestList} className="btn btn-primary">all requests</button>
                        <Link to={`/departments/${department.id}/request/new`} className="btn btn-success">+ add request</Link></p>
                    </div>
                    {showSentReqList?<SentRequestList list={deptRequestSent} dept_name={department.department_name}/>: ""}
                </div>
            </div>
        </div>
    )
}