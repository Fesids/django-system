import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { IProfile } from "../../Interfaces/Profile";
import { AppContext } from "../../Context/AppContext";
import { IMessage } from "../../Interfaces/Message";
import { MessageList } from "../../Components/ChatBoxComp";

export const ChatDetail = () =>{
    const {profileId} = useParams();
    const [profile, setProfile] = useState({} as IProfile);
    const [messages, setMessages] = useState([] as IMessage[]);
    const [sentMessages, setSentMessages] = useState([] as IMessage[]);
    const [msgText, SetMsgText] = useState("");
    const {getProfileDetail, getChatMessages, sendMessage, getSentMessages} = useContext(AppContext);

    const handleOnChange = (e:any) =>{
        SetMsgText(e.target.value);
    }

    useEffect(()=>{
        let prof_id = 0;
        if(profileId){
            prof_id = parseInt(profileId);
        }
        getProfileDetail(prof_id).then(resp => setProfile(resp));
    },[]);

    useEffect(()=>{
        let prof_id = 0;
        if(profileId){
            prof_id = parseInt(profileId);
        }
        const user = 1;
        getChatMessages(1, prof_id).then(resp => setMessages(resp));
    }, []);

    //SENT MESSAGES
    useEffect(()=>{
        let prof_id = 0;
        if(profileId){
            prof_id = parseInt(profileId);
        }
        const user = 1;
        getSentMessages(1, prof_id).then(resp => setSentMessages(resp));
    });

    const handleSendMessage = (e:any) =>{
        e.preventDefault()
        let prof_id = 0;
        if(profileId){
            prof_id = parseInt(profileId);
        }
        const user = 1;

        const msg_body = {
            msg_sender: user,
            msg_receiver: prof_id,
            body: msgText
        }
        sendMessage(msg_body);
    }

    console.log(messages);
    console.log(msgText);
    return(
        <div className="chat-detail-container">

            <div className="chat-container2">
            <div className="identity">
            <div>
            
                <a href="{% url 'index' %}">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-house"
                    viewBox="0 0 16 16"
                >
                    <path
                    fill-rule="evenodd"
                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                    <path
                    fill-rule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                    </svg>
                </a>
            </div>

            <h3>{profile.name}</h3>


            <div className="pro-pic">
                <img src={"profileDetail.pic"} alt="profile-picture"/>
            </div>


        </div>


        <div className="chat-messages-container">
            {/*{messages.map((msg)=>(
                <div>{msg.body}</div>
            ))}

                {sentMessages.map((msg)=>(
                            <div>{msg.body}</div>
                ))}*/}
                <MessageList receivedMessages={messages} senderId={1} sentMessages={sentMessages}/>
                
        </div>

        <div className="chat-message-send-container">
            <form method="post" className="my-form" onSubmit={(e)=> handleSendMessage(e)}>
        
                <textarea className="forms" rows={3} placeholder="Type a message" name="text" onChange={(e)=> handleOnChange(e)}>

                </textarea>

                <input type="submit" value="send" className="btn-input" name="send"/>
            </form>
        </div>

    </div>

   </div>

    )
}