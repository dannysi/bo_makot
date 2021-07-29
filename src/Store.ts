import { makeAutoObservable } from "mobx"

class Store {
    userName: string = ""
    constructor() {
        makeAutoObservable(this)
    }

    setUserName(userName:string) {
        this.userName = userName
    }
}

const store = new Store()
export default store
