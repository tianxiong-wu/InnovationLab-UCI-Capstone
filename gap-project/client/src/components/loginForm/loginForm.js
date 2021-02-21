import React, { useState } from "react"
import { Button } from '@material-ui/core'
import { Typography } from "@material-ui/core"
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import "../signUpForm/signUpForm.css"
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function LoginForm(props){
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginInfo = {
      email: email,
      password: password
    }

    const [loginLanding, setLoginLanding] = useState(props.loginLanding);
    const toggleOne = () => {
        setLoginLanding(false);
        setLoginForm(true);
    }

    const handleEmailChange = (event) => {
      setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value)
    }

    const [loginForm, setLoginForm] = useState(props.loginForm);
    //add toast
    const toggleTwo = () => {
      axios.post('http://localhost:5000/patients/login', loginInfo).then(res => {
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
    }
  

    return(
        <div className={classes.root} >
          <Grid container justify="center" spacing={3}>
            <Grid item xs={3}></Grid>
              {loginLanding === true ? 
              <Grid item xs={6} className="signupButton">
                <div className="buttonStyling" onClick={toggleOne}>
                  <Typography variant="h3" className="textStyling textHolder">Login</Typography>
                  <Typography variant="h6" className="textStyling">(with Existing Account)</Typography>
                </div>
              </Grid>
              : null}
              {loginForm === true ? 
                <Grid item xs={6}>
                <div className="formDiv">
                  <img src="https://picsum.photos/seed/picsum/200/300" className="signupSuccessPhoto"/>
                  <TextField className="formStyling formMargin" id="outlined-basic" label="Email" variant="outlined" onChange = {handleEmailChange} required />
                  <TextField className="formStyling formMargin" type = 'password' id="outlined-basic" label="Password" variant="outlined" onChange = {handlePasswordChange} required />
                  <Button variant="outlined" color="primary" className="nextFullPassword">Forgot Password?</Button>
                  <Button variant="contained" color="primary" className="nextFull nextFullLogin" onClick={toggleTwo}>Login</Button>
                </div>
              </Grid>
              : null}
              <Grid item xs={3}></Grid>                 
          </Grid>
        </div>
    )
}