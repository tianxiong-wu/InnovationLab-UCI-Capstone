import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { Button } from '@material-ui/core';
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
  formControl: {
    width: "100%",
    marginTop: "3%"
  },
}));

export default function LoginForm(props){
    const classes = useStyles();

    // Handles login to initialize the userContext 
    const { user, setUser } = useContext(UserContext);

    // States to handle login data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");

    // Login object
    const loginInfo = {
      email: email,
      password: password
    }

    const handleEmailChange = (event) => {
      setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value)
    }

    const toggleTwo = () => {
      axios.post('http://localhost:5000/patients/login', loginInfo).then(res => {
        setUser(res.data);
      }).catch(err =>{
        console.log(err);
      })
    }
  
    return(
        <div className={classes.root} >
          <Grid container justify="center" spacing={3}>
            <Grid item xs={1} md={3}></Grid>
            <Grid item xs={10} md={6}>
            <div className="formDiv">
              {/* Default image used as filler */}
              <img src="https://picsum.photos/seed/picsum/200/300" className="signupSuccessPhoto"/>
              <TextField className="formStyling formMargin" label="Email" variant="outlined" onChange = {handleEmailChange} required />
              <TextField className="formStyling formMargin" type = 'password' label="Password" variant="outlined" onChange = {handlePasswordChange} required />
              <Button variant="outlined" color="primary" className="nextFullPassword">Forgot Password?</Button>
              <Button disabled={email === "" || password === "" || role === ""} variant="contained" color="primary" className="nextFull nextFullLogin" onClick={toggleTwo}>Login</Button>
            </div>
          </Grid>
              <Grid item xs={1} md={3}></Grid>                 
          </Grid>
        </div>
    )
}