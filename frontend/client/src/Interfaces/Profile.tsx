import { IConnection } from "./Connection";

export interface IProfile{
    id: number,
    name: string,
    pic: string,
    user: number,
    connections: Array<IConnection>
}