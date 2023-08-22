import { IMessage } from "../Interfaces/Message";

interface MessageContainerProps {
    data:IMessage,
    senderId:number
} 

interface MessageListProps{
    sentMessages?: IMessage[],
    receivedMessages: IMessage[],
    senderId: number
}

export const MessageContainer = ({data, senderId}:MessageContainerProps) =>{
    return(
        <>
            {data.msg_sender == senderId?
            <div className="chat-box-sent">
                <p>{data.body}</p>
            </div>:
            <div className="chat-box-received">
                <p>{data.body}</p>
            </div>
            
            }
       </>
    )
}

export const MessageList = ({receivedMessages, senderId, sentMessages}:MessageListProps) =>{

    let messagesList = receivedMessages;
    if(sentMessages){
        messagesList = receivedMessages.concat(sentMessages);
        messagesList = messagesList.sort((a, b)=> a.id - b.id);
    }

    return(
        <div className="chat-box">
            {messagesList.length?messagesList.map((msg)=>(
                <MessageContainer data={msg} senderId={senderId}/>
            )): <p>No messages found</p>}
        </div>
    )
}