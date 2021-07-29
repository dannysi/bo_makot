import React from "react"
import store from "../Store";
import chatPageStore from "./ChatPageStore"
import "./ChatPage.scss";

const isMe = (user:string) => user === store.userName

const getMessageCls = (user: string) => {
    const selfCls =  isMe(user) ? 'self': '';
    return ['message', selfCls, "with-arrow"].join(' ');
}

const createMessageCard = (msg:string, user:string) => {
    const msgCls = getMessageCls(user);
    return (
      <div className={msgCls}>
        <div className="username">{user}</div>
        <div>{msg}</div>
      </div>
    )
}
    

export default function ChatPage() {
    const [newMsg, setNewMsg] = React.useState('');
    const fieldRef = React.useRef<HTMLDivElement>(null);
    const enterMessage = (e, user) => {
        e.preventDefault();
        const elem = createMessageCard(newMsg, user)
        chatPageStore.addMsg(elem);
        setNewMsg("");
        console.log(chatPageStore.allMsgs)        
    }
    const messagesComp = <div className="messages" ref={fieldRef}>{chatPageStore.allMsgs}</div>
    
    React.useEffect(() => {
        fieldRef.current?.lastElementChild?.scrollIntoView({
            behavior: "smooth",
        })
    });

    return (
        <div className="chat">
            {messagesComp} 
            <div className="footer">
                <form className="controls" onSubmit={(msg) => enterMessage(msg, store.userName)}>
                    <input placeholder="Fight!" value={newMsg} onChange={(e) => {setNewMsg(e.target.value)} }/>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}