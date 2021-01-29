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
            <SignUpForm/>
        </Grid>
    )
}

/*

 <Grid container>
            <Grid item lg={3} xl={3} />
            <Grid item lg={6} xl={3} >
                {signUp === true ? 
                <div onClick={toggleSignupClicked}>
                    <SignUpForm />
                </div>
                : null }
                {login === true ? 
                <div onClick={toggleLoginClicked}>
                    <LoginForm  />
                </div>
                : null }
            </Grid>
            <Grid item lg={3} xl={3} />
        </Grid>

*/