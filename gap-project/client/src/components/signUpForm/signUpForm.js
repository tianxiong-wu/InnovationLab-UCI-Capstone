import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import LoginForm from "../loginForm/loginForm"
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


export default function SignUpForm(props){
    // Email validation
    var validator = require('email-validator');
    function validateEmail(email) {
        validator.validate(email);
    }

    // Phone validation
    const phone = require('fonz.js');
    var passwordValidator = require('password-validator');
    var schema = new passwordValidator();
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(16)                                   // Maximum length 16
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .has().symbols();                                // Must have at least one symbol*/

    const classes = useStyles();
    const [signupLanding, setSignupLanding] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loginLanding, setLoginLanding] = useState(false);    
  
    const user = {
      firstName: firstName,
      lastName: lastName,
      birthday: birthdate,
      gender: gender,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    }

    const toggleOne = () => {
      setSignupLanding(false);
      setSignupFormPageOne(true);
    }

    const toggleTwo = () => {
      setSignupFormPageOne(false);
      setSignupFormPageTwo(true);
    }

    const toggleThree = () => {
      console.log(user);
      setSignupFormPageTwo(false);
      setSuccessPage(true);
      
      axios.post('http://localhost:5000/patients/register', user).then(res=>{
        console.log(res);
      })
    }

    const toggleFour = () => {
      setSignupFormPageTwo(false);
      setSignupFormPageOne(true);
    }

    const toggleFive = () => {
      setSuccessPage(false);
      setLoginLanding(true);
    }

    const [signupFormPageOne, setSignupFormPageOne] = useState(false);
    const [signupFormPageTwo, setSignupFormPageTwo] = useState(false);
    const [successPage, setSuccessPage] = useState(false);

    const handleChange = (event) => {
        setGender(event.target.value);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleBirthdateChange = (event) => {
        setBirthdate(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleRepeatChange = (event) => {
        setRepeatPassword(event.target.value);
    }

    return(
      <div className={classes.root}>
          <Grid container justify="center" spacing={3}>
              <Grid item xs={3}></Grid>
              {signupLanding === true ? 
              <Grid item xs={6} className="signupButton">
                <div className="buttonStyling" onClick={toggleOne}>
                  <Typography variant="h3" className="textStyling textHolder">Sign Up</Typography>
                  <Typography variant="h6" className="textStyling">(with Access Code)</Typography>
                </div>
              </Grid>
              : null}
              {signupFormPageOne === true ? 
                <Grid item xs={6}>
                  <div className="formDiv">
                    <Typography variant="h5" color="primary" className="formTitle">Create your account</Typography>
                    <TextField className="formStyling formMargin" id="outlined-basic" label="First Name" defaultValue={firstName} variant="outlined" onChange={handleFirstNameChange} required />
                    <TextField className="formStyling formMargin" id="outlined-basic" label="Last Name" defaultValue={lastName} variant="outlined" onChange={handleLastNameChange} required />
                    <TextField 
                      id="date"
                      label="Birthday"
                      type="date"
                      defaultValue={birthdate}
                      className="formMargin"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      onChange={handleBirthdateChange}
                      required />
                    <FormControl className="selectGender formMargin" required>
                      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={gender}
                        onChange={handleChange}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                  </FormControl>
                    <Button disabled={firstName === "" || lastName === "" || birthdate === "" || gender === ""} variant="outlined" className="nextFull" onClick={toggleTwo}>Next</Button>
                  </div>
                </Grid>
              : null}
              {signupFormPageTwo === true ? 
                <Grid item xs={6}>
                  <div className="formDiv">
                    <Typography variant="h5" color="primary" className="formTitle">Create your account</Typography>
                    <TextField className="formStyling formMargin" id="outlined-basic" label="Email" variant="outlined" defaultValue={email} onChange = {handleEmailChange} required />
                    <TextField className="formStyling formMargin" id="outlined-basic" label="Phone" variant="outlined" defaultValue={phoneNumber} onChange = {handlePhoneNumberChange} required />
                    <TextField className="formStyling formMargin" type="password" id="outlined-basic" label="Password" variant="outlined" onChange = {handlePasswordChange} required />
                    <TextField className="formStyling formMargin" type="password" id="outlined-basic" label="Repeat Password" variant="outlined" onChange = {handleRepeatChange} required />
                  </div>
                  <Button variant="outlined" className="prev" onClick={toggleFour}>Back</Button>
                  <Button disabled = {
                        email === "" ||
                        validateEmail(email) === true || 
                        phone.validate(phoneNumber) === false || 
                        schema.validate(password) === false || 
                        password !== repeatPassword } 
                        variant="outlined" className="next" onClick={toggleThree}>Submit</Button>
                </Grid>
              : null}
              {successPage === true ? 
                <Grid item xs={6}>
                  <div className="formDiv">
                    <img src="https://picsum.photos/seed/picsum/200/300" className="signupSuccessPhoto"/>
                    <Typography variant="h5" align="center" className="signupSuccessTypography">Congratulations!</Typography>
                    <Typography variant="h5" align="center">Your account is ready</Typography>
                  </div>
                <Button variant="outlined" className="nextFull" onClick={toggleFive}>Login</Button>
                </Grid>
              : null }
              {loginLanding === true ? 
                <LoginForm loginLanding={false} loginForm={true}/>
              : null}
              <Grid item xs={3}></Grid>                 
          </Grid>
      </div>
    )
}