import React, { useState } from "react"
import { Button } from '@material-ui/core'
import { Typography } from "@material-ui/core"
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "../signUpForm/signUpForm.css"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
  }));

export default function LoginForm(){
    const classes = useStyles();

    const [loginLanding, setLoginLanding] = useState(true);
    const toggleOne = () => {
        setLoginLanding(false);
        setLoginForm(true);
    }

    const [loginForm, setLoginForm] = useState(false);
    const toggleTwo = () => {
        alert('take me to my home page!!')
    }

    return(
        <div>
            {loginLanding === true ? 
            <div className="buttonStyling" onClick={toggleOne}>
              <span className="textHolder">
                  <Typography variant="h3" className="textStyling textHolder">Login</Typography>
                  <Typography variant="h6" className="textStyling">(with Existing Account)</Typography>
              </span>
            </div>
            : null }
            {loginForm === true ? 
            <div className="formDiv signupSuccessDiv">
                    <img src="https://picsum.photos/seed/picsum/200/300" className="signupSuccessPhoto"/>
                    <TextField className="formStyling" id="outlined-basic" label="Username" variant="outlined" required />
                    <TextField className="formStyling" id="outlined-basic" label="Password" variant="outlined" required />
                    <Button variant="text" color="primary" className="forgotButton">Forgot Password?</Button><br></br>
                    <Button variant="contained" color="primary" className="signupSuccessButton" onClick={toggleTwo}>Login</Button>
            </div>
            : null }
        </div>
    )
}