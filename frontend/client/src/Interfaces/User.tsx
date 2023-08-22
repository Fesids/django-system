export enum UserRole{
    EXTERNAL_USER = "EXTERNAL_USER",
    EMPLOYEE = "EMPLOYEE",
    ADMIN = "ADMIN",
}

export interface IUser{
    id: number,
    username: string,
    email: string,
    password: string,
    department: string
    //uRole: UserRole
}

export interface UserRegisterReq extends Omit<IUser, "id" | "department">{
    re_password: string
}

export interface UserLoginReq extends Omit<IUser, "id" | "uRole" | "username">{

}
