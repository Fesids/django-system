import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { AppContext } from "../Context/AppContext";
import { IRequestClient } from "../Interfaces/RequestClient";
import { IRequest } from "../Interfaces/Request";
import { IDepartment } from "../Interfaces/Department";
import { IProfile } from "../Interfaces/Profile";


export const RequesDetailPage = () =>{

    const {id, dept_name} = useParams();
    const {getClientRequestDetail, getRequestDetail, updateDestIdAndSenderId, getDepartmentList, getProfileUserId, currentUserProfile, createChat} = useContext(AppContext);
    const [showMore, setShowMore] = useState(false);
    //const [clientRequest, setClientRequest] = useState({} as IRequestClient);
    const [request, setRequest] = useState({} as IRequest);
    const [departments, setDepartments] = useState([] as IDepartment[]);
    const [requestSentProfile, setRequestSentProfile] = useState({} as IProfile);



    useState(()=>{
        let cr_id = 0;
        if(id){
            cr_id = parseInt(id);
        };

        getRequestDetail(cr_id).then(resp => setRequest(resp));
    });

    // set departments
    useEffect(()=>{
        getDepartmentList().then(resp => setDepartments(resp));
    });

    useEffect(()=>{
        let sender_id = 0;
        if(request){
            sender_id = request.user_sender
        }
        getProfileUserId(request.user_sender)
        .then(resp => setRequestSentProfile(resp));
    });

    const handleCreateChat = (e:any) =>{
        e.preventDefault();
        let currentUserProfileId = 0;
        if(currentUserProfile){
            currentUserProfileId = currentUserProfile.id;
        }

        let requestProfileId = 0;
        if(requestSentProfile){
            requestProfileId = requestSentProfile.id
        }

        createChat(currentUserProfileId, requestProfileId);
    }
 
    console.log(requestSentProfile);

    const testeWindow = () =>{
        //window.open("teste.html", "", h)
    }

    let body = ""
    if(request.body){
        body = request.body
    }

    return(
        <div className="request-detail-container">
            <div className="request-detail">
            
               
                <p className="subject">subject {request.subject}</p>

                <div className="request-body">
                    {showMore?body: body.substring(0, 100)} <p onClick={()=> setShowMore(!showMore)}>{!showMore?"show more":"show less"}</p>

                </div>


            
                <p>created at {request.created_at}</p>

                <div className="buttons-container">
                    <button onClick={(e)=> handleCreateChat(e)} className="connection-btn">+ Send message to {requestSentProfile.name} </button>
                    <button className="btn btn-outline-danger">reject</button>
                </div>
            </div>
        </div>
    )
}