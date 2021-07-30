import { makeAutoObservable } from "mobx"

class ChatPageStore {
    allMsgs: JSX.Element[] = [];
    constructor() {
        makeAutoObservable(this)
    }

    addMsg(elem:JSX.Element) {
        this.allMsgs.push(elem) 
        console.log("updated");
    }
}

const chatPageStore = new ChatPageStore()
export default chatPageStore
