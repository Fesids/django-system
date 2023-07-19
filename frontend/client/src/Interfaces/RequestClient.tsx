export interface IRequestClient{
    id: number,
    destination_dept_id: number,
    subject: string,
    body: string,
    createdAt: string,
    client_email: string
}

export interface IRequestClientCreateBody extends Omit<IRequestClient, "request_id"|"destination_dept_id"|"created_at">{

}