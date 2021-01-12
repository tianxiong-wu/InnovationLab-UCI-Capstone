import React, { useState } from 'react';
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


export default function SignUpForm(){
    const classes = useStyles();
    const [signupLanding, setSignupLanding] = useState(true);
    
    const toggleOne = () => {
      setSignupLanding(false);
      setSignupFormPage(true);
    }

    const toggleTwo = () => {
      setSignupFormPage(false);
      setSuccessPage(true);
    }

    const toggleThree = () => {
      alert('take me to login page using react router!')
    }

    const [signupFormPage, setSignupFormPage] = useState(false);
    const [successPage, setSuccessPage] = useState(false);


    return(
        <div>
          {signupLanding === true ? 
            <div className="buttonStyling" onClick={toggleOne}>
              <span className="textHolder">
                  <Typography variant="h3" className="textStyling textHolder">Sign Up</Typography>
                  <Typography variant="h6" className="textStyling">(with Access Code)</Typography>
              </span>
            </div>
            : null }
          {signupFormPage === true ? 
            <div className="formDiv">
                    <Typography variant="h5" color="primary" className="formTitle">Create your account</Typography>
                    <TextField className="formStyling" id="outlined-basic" label="Access code" variant="outlined" required />
                    <TextField className="formStyling" id="outlined-basic" label="Username" variant="outlined" required />
                    <TextField className="formStyling" id="outlined-basic" label="Email" variant="outlined" required />
                    <TextField className="formStyling" id="outlined-basic" label="Phone Number" variant="outlined" required />
                    <TextField className="formStyling" id="outlined-basic" label="Password" variant="outlined" required />
                    <TextField className="formStyling" id="outlined-basic" label="Confirm Password" variant="outlined" required />
                    <Button variant="outlined" className="submitStyling" onClick={toggleTwo}>Submit</Button>
            </div>
            : null }
          {successPage === true ? 
            <div className="signupSuccessDiv">
                <img src="https://picsum.photos/seed/picsum/200/300" className="signupSuccessPhoto"/>
                <Typography variant="h4" className="signupSuccessTypography">Congratulations!</Typography>
                <Typography variant="h5" >Your account is ready</Typography>
                <Button variant="contained" color="primary" className="signupSuccessButton" onClick={toggleThree}>Login</Button>
            </div>
            : null }
        </div>
    )
}

/*


*/