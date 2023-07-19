import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { IUser} from "../Interfaces/User";
import { IDepartment } from "../Interfaces/Department";
import { SearchQuery } from "../Interfaces/Search";
import { ISiteType } from "../Interfaces/SiteType";
import { IRequestClient, IRequestClientCreateBody } from "../Interfaces/RequestClient";
import { ICreateRequest, IRequest, ISendRequest } from "../Interfaces/Request";
import { IProfile } from "../Interfaces/Profile";
import { IConnection } from "../Interfaces/Connection";
import { IMessage } from "../Interfaces/Message";
import { LoginResponse } from "../Interfaces/Auth/LoginResponse";
import { any } from "prop-types";

interface AppContextProps{

    register(user:any): void,
    registerExternal(user:any): void,
    currentUser: null | any,
    getCookie():void,
    login(e:any, user:any): Promise<LoginResponse>,
    getUser(token:any): Promise<any>, 
    getDepartmentList(): Promise<IDepartment[]>,
    getDepartment(dept_id:number): Promise<IDepartment>,
    getUsersByDeptId(dept_id:string): Promise<IUser[]>,
    searchUser(char:SearchQuery): Promise<IUser[]>,
    getAllSiteType(): Promise<ISiteType[]>,
    getSiteDetail(id:string): Promise<ISiteType>,
    createRequestClient(body: any): Promise<IRequestClientCreateBody>,
    getAllClientRequest(id:string): Promise<IRequestClient[]>,

    getReceivedRequests(dept_id:number): Promise<IRequest[]>,
   
    getClientRequestDetail(req_id:number): Promise<IRequestClient>,
    getRequestDetail(req_id:number): Promise<IRequest>,
    createRequest(body:any): Promise<any>;

    deleteClientRequest(req_id:number): Promise<any>;
    deleteRequest(req_id:number): Promise<any>;
    updateDestIdAndSenderId(up_body:ISendRequest, request_id:number): Promise<IRequest>;
    getSentRequests(dept_id:number): Promise<IRequest[]>,

    getProfileUserId(user_id:number): Promise<IProfile>;
    getProfileDetail(profile_id:number): Promise<IProfile>;
    getConnectionsByProfileId(profile_id:number): Promise<Array<IConnection>>;

    getChatMessages(sender:number, receiver:number): Promise<IMessage[]>;
    sendMessage(msg_body:Omit<IMessage, "id" | "seen">): Promise<IMessage>;
    getSentMessages(sender:number, receiver:number): Promise<IMessage[]>;
    

}

export const AppContext = createContext({} as AppContextProps);


export const AppContextProvider = ({children}:React.PropsWithChildren)=>{
    const [currentUser, setCurrentUser] = useState<null | any>(JSON.parse(localStorage.getItem("currentuser") || "{}"));
    const [user, setUser] = useState({} as IUser);
    const [csrfToken, setCsrfToken] = useState("");


    const getUser = async (token:any) =>{
        try{
            const resp = await axios.get("api/auth/user", {
                withCredentials:true,
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            localStorage.setItem("currentuser", JSON.stringify(resp.data))
            setCurrentUser(resp.data);
            return resp.data;

        }catch(err){
            throw new Error("Failed to retrive")
        }
    }

    const getCookie = async ()=>{
        try{
            await axios.get("api/auth/csrf_cookie/");
        }catch(err){
            throw new Error("failed to get cookie")
        }
    }
    const register = async (user:any)=>{
        const config = {
            headers:{
                "X-CSRFToken":"3z3JF1JC3Mif7Shv22UoD7OVPTulyQFK"
            },

            withCredentials:true
        }
        try{
            const resp = await axios.post("api/auth/signup/", user, config);
        } catch(err:unknown){
            console.log(err);
        }
    }

    const registerExternal = async (user:any)=>{
        try{
            await axios.post("api/auth/external/signup/", user);

        }catch(err){
            throw new Error("Failed to register external user");
        }
    }

    const login = async (e:any, user:any) =>{

        e.preventDefault()
        try{
            const resp = await axios.post("api/auth/login/", user,{
                withCredentials:true,
                headers:{
                    "Content-Type": "application/json"
                }
            });
            if(resp.headers["X-Csrftoken"]){
                setCsrfToken(resp.headers["X-Csrftoken"])
            }
            console.log("ain : "+csrfToken);
            return resp.data
            
        } catch(err){
            console.log(err)
        }
    }

    const getDepartmentList = async () =>{
        const resp = await axios.get("api/department/list");
        return resp.data;
    }

    const getDepartment = async (dept_id:number) =>{
        try{
            const department = await axios.get("api/department/detail/"+dept_id);
            return department.data;
        }catch(err){
            throw new Error(`department with id ${dept_id} not found`);
        }
    }

    const getUsersByDeptId = async (dept_id:string) =>{
        try{
            const usersByDept = await axios.get("api/auth/users/department/"+dept_id);
            return usersByDept.data;
        }catch(err){
            throw new Error("")
        }

    }

    const getAllSiteType = async ()=>{
        try{
            const allSiteType = await axios.get("api/product/product_list");
            return allSiteType.data;
        }catch(err){
            throw new Error("Something went  wrong trying to retrieve siteTypeList");
        }
    }

    const getSiteDetail = async (id:string) =>{
        try{
            const getSiteDetail = await axios.get(`api/product/product_list/detail/${id}`);
            return getSiteDetail.data;
        }catch(err){
            throw new Error("site with id "+ id + " couldn't be retrieved");
        }
    }
    useEffect(()=>{
        localStorage.setItem("currentuser", JSON.stringify(user));
    });

    const searchUser = async (char:SearchQuery) =>{
        const resp = await axios.post("api/auth/search/user", char);

        return resp.data;

    }

    const createRequestClient = async (body:any) =>{
        try{
            const res = await axios.post("api/request/list/client/new", body);
            return res.data; 
        } catch(err){
            throw new Error("failed to create request client");
        }
    }

    const getAllClientRequest = async (id:string) =>{
        try{
            const resp = await axios.get("api/request/list/client");
            return resp.data;
        } catch(err){
            throw new Error("axios failed to retrieve client");
        }
    }

    const getReceivedRequests = async (dept_id:number) =>{
        try{
         const res = await axios.get("api/request/list/department/received/"+dept_id);
         return res.data;
        }catch(err){
            throw new Error("failed to retrieve received requests")
        }
    }

    const getClientRequestDetail = async (req_id:number): Promise<IRequestClient> =>{
        try{
            const resp = await axios.get("api/request/list/client/"+req_id);
            return resp.data;
        }catch(err){
            throw new Error("Failed to retrieve client request detail");
        }
    }

    const getRequestDetail = async (dept_id:number): Promise<IRequest> =>{
        try{
            const resp = axios.get("api/request/list/"+dept_id);
            return (await resp).data;
        }catch(err){
            throw new Error("Failed to retrieve request")
        }
    }

    const createRequest = async (body:any) =>{
        try{
            const resp = await axios.post("api/request/list", body);
            return resp.data;
        }catch(err){
            throw new Error("failed to create request")
        }
    }

    const deleteClientRequest = async (req_id:number) =>{
        await axios.delete(`api/request/list/client/${req_id}`)
            .catch(resp => resp);
    }

    const deleteRequest = async (req_id:number) =>{
        await axios.delete(`api/request/list/${req_id}`)
        .catch(resp => resp);
    }

    const  updateDestIdAndSenderId = async (up_body:ISendRequest, request_id:number): Promise<IRequest>=>{
        try{
            const res = axios.put(`http://localhost:8087/api/request/update/request/${request_id}`);
            return (await res).data;
        }catch(err){
            throw new Error("")
        }
    }
    
   
    const getSentRequests = async (dept_id:number)=>{
        try{
            const resp = await axios.get("api/request/list/department/sender/"+dept_id);
            return resp.data
        }catch(err){
            throw new Error("Deu erro, faz parte");
        }
    }


    const getProfileUserId = async  (user_id:number): Promise<IProfile> =>{
        try{
            const resp = await axios.get("api/chat/profile/user/"+user_id);
            return resp.data;
        }catch(err){
            throw new Error("Failed to retrieve profile")
        }
    }

    const getConnectionsByProfileId = async (profile_id:number): Promise<Array<IConnection>> =>{
        try{
            const resp = await axios.get("api/chat/connection/list/"+profile_id);
            return resp.data;
        }catch(err){
            throw new Error("failed to retrive connections")
        }
    }

    const getProfileDetail = async  (profile_id:number) =>{
        try{
            const resp = await axios.get("api/chat/profile/detail/"+profile_id);
            return resp.data;
        }catch(err){
            throw new Error("failed to retrieve profile")
        }
    }
    const getChatMessages = async (sender:number, receiver:number): Promise<IMessage[]> =>{
        try{
            const resp = await axios.get(`api/chat/message/received/${receiver}/${sender}`);
            return resp.data;
        }catch(err){
            throw new Error("Failed to retrieve messages")
        }
    }

    const getSentMessages = async (sender:number, receiver:number): Promise<IMessage[]> =>{
        try{
            const resp = await axios.get(`api/chat/message/sent/${receiver}/${sender}`);
            return resp.data;
        }catch(err){
            throw new Error("Failed to retrieve messages")
        }
    }


    const sendMessage = async (msg_body:Omit<IMessage, "id" | "seen">): Promise<IMessage> =>{
        try{
            const resp = await axios.post("api/chat/message/new", msg_body);
            return resp.data;
        }catch(err){
            throw new Error("Failed to send message");
        }
    }


    return(

        <AppContext.Provider value={{register, login, getDepartmentList, getDepartment, 
            getUsersByDeptId, searchUser, getAllSiteType, getSiteDetail, 
            createRequestClient, getAllClientRequest, getReceivedRequests, getClientRequestDetail,getRequestDetail,
            createRequest, deleteClientRequest, deleteRequest, updateDestIdAndSenderId, getSentRequests,
            registerExternal, getCookie, getProfileUserId, getConnectionsByProfileId, getProfileDetail, getChatMessages,
            sendMessage, getSentMessages, getUser, currentUser}}>
            {children}
        </AppContext.Provider>
    )

}
