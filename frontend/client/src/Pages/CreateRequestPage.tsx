import { useContext, useEffect, useState } from "react";
import { IDepartment } from "../Interfaces/Department";
import { AppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import { ICreateRequest, ISendRequest } from "../Interfaces/Request";
import Select from "react-select";



export const CreateRequestPage = () =>{


    const [departments, setDepartments] = useState([] as IDepartment[]);
    const {getDepartmentList, createRequest} = useContext(AppContext);
    const {dept_id} = useParams();
    const [createBody, setCreateBody] = useState({} as Omit<ICreateRequest, "sender_dept_id">);
    const [img, setImg] = useState("");
    

    // set departments
    useEffect(()=>{
        let send_dept_id = 0
        if(dept_id){
            send_dept_id = parseInt(dept_id);
        }
        getDepartmentList().then(resp => setDepartments(resp.filter(dep => dep.id !=send_dept_id)));
    },[dept_id])

    console.log(createBody);

    const handleOnChange = (e:any) =>{
        setCreateBody({...createBody, [e.target.name]: e.target.value})
    }


    const handleCreateRequest = (e:any) =>{
        e.preventDefault();
        let send_dept_id = 0
        if(dept_id){
            send_dept_id = parseInt(dept_id);
        }
        const b = {
            user_sender: 1,
            sender_dept_id: send_dept_id,
            ...createBody
        }

        const user_sender = 1;
        const formData = new FormData;
        formData.append("user_sender", user_sender.toString());
        formData.append("sender_dept_id", send_dept_id.toString());
        formData.append("destination_dept_id", createBody.destination_dept_id.toString());
        formData.append("subject", createBody.subject);
        formData.append("body", createBody.body);
        formData.append("request_image", img);
        createRequest(formData);
    }

    return(
        <div>
            <p>Create a new Request {dept_id}</p>
            <form onSubmit={(e)=> handleCreateRequest(e)}>

                <div className="form-group">
                    <label htmlFor="request_img" className="form-label mt-3">IMAGE : </label>
                    <input name="request_img" className="form-control" id="request" type="file" onChange={(e:any)=> setImg(e.target.files[0])}></input>
                </div>

                <div className="form-group">
                    <select onChange={(e)=> handleOnChange(e)} name="destination_dept_id" /*defaultValue={departments[0].id}*/>
                        {departments.map(dept => <option value={dept.id}>{dept.department_name}</option>)}
                    </select>
                    {/*<Select options={departments} defaultValue={departments[0]} name="destination_dept_id" onChange={(e)=> handleOnChange(e)}></Select>*/}

                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="form-label mt-3">SUBJECT : </label>
                    <input name="subject" className="form-control" id="subject" onChange={(e)=> handleOnChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="form-label mt-3">BODY : </label>
                    <input name="body" className="form-control" id="body" onChange={(e)=> handleOnChange(e)}></input>
                </div>
                <input type="submit" value={"send"}></input>
            </form>
        </div>
    )

}