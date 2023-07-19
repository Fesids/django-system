import { IUser } from "../Interfaces/User";

export const UserComp = (u: IUser) =>{
    return(
        <div>
            <h2>{u.username} - {u.email}</h2>
        </div>
    )
}