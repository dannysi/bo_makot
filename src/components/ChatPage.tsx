import React from "react"
import store from "../Store";
import chatPageStore from "./ChatPageStore"
import "./ChatPage.scss";
import { observe } from "mobx";
import { observer } from "mobx-react";

const isMe = (user:string) => user === store.userName

const getMessageCls = (user: string) => {
    const selfCls =  isMe(user) ? 'self': '';
    return ['message', selfCls, "with-arrow"].join(' ');
}

const createMessageCard = (msg:string, user:string, key:number) => {
    const msgCls = getMessageCls(user);
    return (
      <div className={msgCls} key={key}>
        <div className="username">{user}</div>
        <div>{msg}</div>
      </div>
    )
}

interface Message {
    msg: string;
    user: string;
}

const channel = "test_channel"
const recieverBc = new BroadcastChannel(channel);
// TODO convert to class 
function ChatPage() {
    const [newMsg, setNewMsg] = React.useState('');
    const fieldRef = React.useRef<HTMLDivElement>(null);
    const myMessage =(e, user) => {
        e.preventDefault();
        // const bc = new BroadcastChannel(channel);
        const sendData = {msg:newMsg, user:user}
        recieverBc.postMessage(sendData);
        enterMessage(sendData); 
    }
    const enterMessage = ({msg, user}:Message) => {
        const elem = createMessageCard(msg, user, chatPageStore.allMsgs.length) 
        chatPageStore.addMsg(elem);
        setNewMsg("");
        
    }
    const messagesComp = <div className="messages" ref={fieldRef}>{chatPageStore.allMsgs}</div>
    
    React.useEffect(() => {
        fieldRef.current?.lastElementChild?.scrollIntoView({
            behavior: "smooth",
        })
    });
    React.useEffect(() => {
        const interval = setInterval(() => {
            recieverBc.onmessage = (msg) => enterMessage(msg.data)
        }, 1000)
        return () => clearInterval(interval);
    },[]);
        

    return (
        <div className="chat">
            {messagesComp} 
            <div className="footer">
                <form className="controls" onSubmit={(msg) => myMessage(msg, store.userName)}>
                    <input placeholder="Fight!" value={newMsg} onChange={(e) => {setNewMsg(e.target.value)} }/>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default observer(ChatPage)