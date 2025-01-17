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
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: "97%",
      marginTop: "10vh"
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

    // Password Validator
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
    const [role, setRole] = useState("");
    const [roleLanding, setRoleLanding] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loginLanding, setLoginLanding] = useState(false);    
  
    // User and Pharmacist Objects for Sign up to pass to backend
    const user = {
      firstName: firstName,
      lastName: lastName,
      birthday: birthdate,
      gender: gender,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      role: role
    }

    const pharmacistUser = {
      firstName: firstName,
      lastName: lastName,
      birthday: birthdate,
      gender: gender,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      role: role
    }
    const toggleRoleSelect = () => {
      setRoleLanding(false);
      setSignupFormPageOne(true);
    }
    const toggleRoleTwo = () => {
      setSignupFormPageOne(false);
      setRoleLanding(true);
    }
    const toggleTwo = () => {
      setSignupFormPageOne(false);
      setSignupFormPageTwo(true);
    }

    // On click handler for sending data to backend for register user
    const toggleThree = () => {
      setSignupFormPageTwo(false);
      setSuccessPage(true);
      if (role === "patient"){
      axios.post(`http://localhost:5000/patients/register`, user).then(res=>{
      })}
      else if (role === "pharmacist"){
        axios.post(`http://localhost:5000/pharmacists/register`, pharmacistUser).then(res=>{
      })}
    }

    const toggleFour = () => {
      setSignupFormPageTwo(false);
      setSignupFormPageOne(true);
    }
    const toggleFive = () => {
      setSuccessPage(false);
    }

    const [signupFormPageOne, setSignupFormPageOne] = useState(false);
    const [signupFormPageTwo, setSignupFormPageTwo] = useState(false);
    const [successPage, setSuccessPage] = useState(false);

    const handleChange = (event) => {
        setGender(event.target.value);
    }

    const handleRoleChange = (event) => {
      setRole(event.target.value);
      if(role !== ""){
        setRoleLanding(true);
      }
    };

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
              <Grid item xs={1} md={3}></Grid>
              {roleLanding === true ? 
              <Grid item xs={10} md={6}>
                <div className="formDiv">
                  <Typography variant="h5" color="primary" className="formTitle">Select Your Account Type</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      onChange={handleRoleChange}
                      fullWidth
                    >
                      <MenuItem value={""}>None</MenuItem>
                      <MenuItem value={"patient"}>Patient</MenuItem>
                      <MenuItem value={"pharmacist"}>Pharmacist</MenuItem>
                    </Select>
                </FormControl>
                <Button disabled={role === ""} variant="outlined" className="nextFull" onClick={toggleRoleSelect}>Next</Button>
                </div>  
              </Grid> : null}
              {signupFormPageOne === true ? 
                <Grid item xs={10} md={6}>
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
                    <Button variant="outlined" className="prev" onClick={toggleRoleTwo}>Back</Button>
                    <Button disabled={firstName === "" || lastName === "" || birthdate === "" || gender === ""} variant="outlined" className="next" onClick={toggleTwo}>Next</Button>
                  </div>
                </Grid>
              : null}
              {signupFormPageTwo === true ? 
                <Grid item xs={10} md={6}>
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
                <Grid item xs={10} md={6}>
                  <div className="formDiv">
                    {/* Whitelabeling image */}
                    <img src="https://picsum.photos/seed/picsum/200/300" className="signupSuccessPhoto"/>
                    <Typography variant="h5" align="center" className="signupSuccessTypography">Congratulations!</Typography>
                    <Typography variant="h5" align="center">Your account is ready</Typography>
                  </div>
                <Link to="/Login" className="loginLink" onClick={toggleFive}><Button className="nextFull">Login</Button></Link>
                </Grid>
              : null }
              {loginLanding === true ? 
                <LoginForm loginLanding={false} loginForm={true}/>
              : null}
              <Grid item xs={1} md={3}></Grid>                 
          </Grid>
      </div>
    )
}