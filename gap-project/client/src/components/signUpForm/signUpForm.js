import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import "../signUpForm/signUpForm.css"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }));


export default function SignUpForm(){
    const classes = useStyles();
    const [signupLanding, setSignupLanding] = useState(true);
    
    const toggleOne = () => {
      setSignupLanding(false);
      setSignupFormPageOne(true);
    }

    const toggleTwo = () => {
      setSignupFormPageOne(false);
      setSignupFormPageTwo(true);
    }

    const toggleThree = () => {
      setSignupFormPageTwo(false);
      setSuccessPage(true);
    }

    const toggleFour = () => {
      setSignupFormPageTwo(false);
      setSignupFormPageOne(true);
    }

    const toggleFive = () => {
      alert('Aye you done!!')
    }

    const [signupFormPageOne, setSignupFormPageOne] = useState(false);
    const [signupFormPageTwo, setSignupFormPageTwo] = useState(false);
    const [successPage, setSuccessPage] = useState(false);
    const [gender, setGender] = React.useState('');

    const handleChange = (event) => {
      setGender(event.target.value);
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
                    <TextField className="formStyling formMargin" id="outlined-basic" label="First Name" variant="outlined" required />
                    <TextField className="formStyling formMargin" id="outlined-basic" label="Last Name" variant="outlined" required />
                    <TextField 
                      id="date"
                      label="Birthday"
                      type="date"
                      defaultValue="2017-05-24"
                      className="formMargin"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      required />
                    <FormControl className="selectGender formMargin" required>
                      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        onChange={handleChange}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                  </FormControl>
                    <Button variant="outlined" className="nextFull" onClick={toggleTwo}>Next</Button>
                  </div>
                </Grid>
              : null}
              {signupFormPageTwo === true ? 
                <Grid item xs={6}>
                  <div className="formDiv">
                    <Typography variant="h5" color="primary" className="formTitle">Create your account</Typography>
                    <TextField className="formStyling formMargin" id="outlined-basic" label="Email" variant="outlined" required />
                    <TextField className="formStyling formMargin" id="outlined-basic" label="Phone" variant="outlined" required />
                    <TextField className="formStyling formMargin" id="outlined-basic" label="Password" variant="outlined" required />
                    <TextField className="formStyling formMargin" id="outlined-basic" label="Repeat Password" variant="outlined" required />
                  </div>
                  <Button variant="outlined" className="prev" onClick={toggleFour}>Back</Button>
                  <Button variant="outlined" className="next" onClick={toggleThree}>Submit</Button>
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
              <Grid item xs={3}></Grid>                 
          </Grid>
      </div>
    )
}