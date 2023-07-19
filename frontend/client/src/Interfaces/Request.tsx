export interface IRequest{
    id: number,
    user_sender: number,
    sender_dept_id: number,
    destination_dept_id: number,
    subject: string,
    body: string,
    created_at: string,
    
}


export interface ICreateRequest{
   // request_id: number,
    //user_sender_id: number,
    sender_dept_id: number,
    destination_dept_id: number,
    subject: string,
    body: string,
    //created_at: string,
    
}

export interface ISendRequest{
    //request_id: number,
    user_sender_id: number,
    sender_dept_id: string,
    destination_dept_id: string,
    //subject: string,
    body: string,
    //created_at: string,
    
}
