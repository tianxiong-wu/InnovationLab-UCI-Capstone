import React, { useState } from "react"
import SignUpForm from "../../components/signUpForm/signUpForm"
import LoginForm from "../../components/loginForm/loginForm"
import { Grid } from "@material-ui/core"

export default function LoginSignUp(){

    const [signUp, setSignUp] = useState(true);
    const [login, setLogin] = useState(true);

    const toggleSignupClicked = () => {
        setLogin(false);
    }

    const toggleLoginClicked = () => {
        setSignUp(false);
    }

    return (
        <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                {signUp === true ?
                <div onClick={toggleSignupClicked}> 
                    <SignUpForm/>
                </div>
                : null }
                {login === true ?
                <div onClick={toggleLoginClicked}>
                    <LoginForm loginLanding={true} loginForm={false}/>
                </div>
                : null }
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}