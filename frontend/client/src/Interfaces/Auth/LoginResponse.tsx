import { IUser } from "../User";

export interface LoginResponse{
    
    refresh_token: string,
    access_token: string,
    user?: IUser 
    
}