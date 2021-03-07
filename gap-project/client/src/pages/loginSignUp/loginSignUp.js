import React, { useState } from "react";
import SignUpForm from "../../components/signUpForm/signUpForm";
import LoginForm from "../../components/loginForm/loginForm";
import Typography from "@material-ui/core/Typography";
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";
import { Grid } from "@material-ui/core";
import '../loginSignUp/loginSignUp.css'

export default function LoginSignUp(){

    const [buttonClicked, setButtonClicked] = useState(false);
    const handleClick = () => {
        setButtonClicked(!buttonClicked);
    }

    return (
        <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                {buttonClicked === false ? 
                    <Link className="authStyling" to="/Signup" onClick={handleClick}><div className="buttonStyling">Sign Up</div></Link>
                : null }
                {buttonClicked === false ? 
                    <Link className="authStyling" to="/Login" onClick={handleClick}><div className="buttonStyling">Login</div></Link>
                : null }
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}