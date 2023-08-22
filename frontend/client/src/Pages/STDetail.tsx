import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { AppContext } from "../Context/AppContext";
import { ISiteType } from "../Interfaces/SiteType";
import { IRequestClient, IRequestClientCreateBody } from "../Interfaces/RequestClient";

export const STDetail = () =>{
    const {id} = useParams();
    const {getSiteDetail, createRequestClient} = useContext(AppContext);
    const [siteDetail, setSiteDetail] = useState({} as ISiteType);
    const [newReqBody, setNewReqBody] = useState({} as IRequestClientCreateBody);

    

    const handleOnChange = (e:any) =>{
        setNewReqBody({...newReqBody, [e.target.name]:e.target.value})
    }

    useEffect(()=>{
        let st_id = ""
        if(id){
            st_id = id;
        }

        getSiteDetail(st_id).then(resp => setSiteDetail(resp));

    }, []);

    console.log(newReqBody);
    const handleOnSubmit = (e:any) =>{
        
        e.preventDefault();
        let st_id = ""
        if(id){
            st_id = id;
        }

        const body = {
            destination_dept_id: 3, // SALES DEPARTMENT ID
            ...newReqBody
        }
        createRequestClient(body);
    }
    

    return(
        <div className="create-request-container">
            <p className="body">
                {siteDetail.body}
            </p>
           
            <div className="create-request">
                <div className="header">
                    <h2>Are you interest on our services?</h2>
                </div>
               
            
            

        
            <form method="post" onSubmit={(e)=> handleOnSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="client_email" className="form-label mt-3">Email : </label>
                    <input name="client_email" className="form-control" id="client_email" onChange={(e)=> handleOnChange(e) }></input>
                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="form-label mt-3">Subject : </label>
                    <input name="subject" className="form-control" id="subject" onChange={(e)=> handleOnChange(e) }></input>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="form-label mt-3">Body : </label>
                    <textarea name="body" className="form-control" id="body" onChange={(e)=> handleOnChange(e) }></textarea>
                </div>

                <input type="submit" value={"send"} className="btn-submit"></input>
            </form>
            </div>
        </div>
    )
}