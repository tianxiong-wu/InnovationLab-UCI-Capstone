import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";
import { Grid } from "@material-ui/core";
import '../loginSignUp/loginSignUp.css'

export default function LoginSignUp(){
    // Parent component to hold the login and signup interfaces
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