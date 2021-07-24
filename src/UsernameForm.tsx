import { Button, TextField } from "@material-ui/core"
import React from "react"
import store from './Store'




function UsernameForm() {
    const [username, setUsername] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username) store.setUserName(username)
    }

    return (
        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
            {"ברוכים הבאים לבוא-מכות"}
            <div><TextField id="standard-basic" onChange={(e) => setUsername(e.target.value)} /> </div>
            <Button className="SubmitButton" type="submit" color="secondary" variant="contained" > Submit </Button>
      </form>
    )
}


export default UsernameForm