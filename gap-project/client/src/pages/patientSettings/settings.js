import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../../UserContext";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import {FormControl, 
        FormLabel,
        Radio, 
        RadioGroup, 
        FormControlLabel} from '@material-ui/core';
import './settings.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      height: '100vh'
    },
  }));

export default function PatientSettings(){

    const {user, setUser} = useContext(UserContext);

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [notifyPhone, setNotifyPhone] = useState("Yes");
    const [notifyEmail, setNotifyEmail] = useState("Yes");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleCurrentPass = (event, newValue) => {
        setCurrentPass(newValue);
    }

    const handleNewPass = (event, newValue) => {
        setNewPass(newValue);
    }

    const handleRepeatPass = (event, newValue) => {
        setRepeatPass(newValue);
    }

    const handleNotifyPhone = (event, newValue) => {
        console.log(newValue);
        setNotifyPhone(newValue);
    };

    const handleNotifyEmail = (event, newValue) => {
        console.log(newValue);
        setNotifyEmail(newValue);
    };

    const handleNewPhone = (event) => {
        console.log(event.target.value);
        setPhone(event.target.value);
    }

    const handleNewEmail = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    }

    const updatePatientSettings = () => {
        /* if updateNotify type was implemented
        let type = "";
        if (notifyEmail === "Yes" && notifyPhone === "Yes"){
            type = "both"
        }
        else if (notifyEmail === "Yes" && notifyPhone === "No"){
            type = "email"
        }
        else if (notifyEmail === "No" && notifyPhone === "Yes"){
            type = "phone"
        }
        const notify = {"notificationType": type}
        axios.post(`http://localhost:5000/patients/`)*/

        const values = {
            "phoneNumber": phone,
            "email": email,
            "birthday": "12/26/1997",
        }

        let userId = String(user._id);
        axios.post(`http://localhost:5000/patients/updateInfo/${userId}`, values).then(res => {
            console.log(res);
        })
    }

    useEffect(() => {
        if (user.notificationType === "both"){
            setNotifyEmail("Yes");
            setNotifyPhone("Yes");
        }
        else if (user.notificationType === "email"){
            setNotifyEmail("Yes");
            setNotifyPhone("No");
        }
        else if (user.notificationType === "phone"){
            setNotifyPhone("Yes");
            setNotifyEmail("No");
        }
    },[])
    
    return (
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
            <div className={classes.root}>
                <Typography variant="h3" align="center" className="pageLabel">Settings</Typography>
                <div className="blueOutline">
                <AppBar position="static" className="appBar">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className="tabAlign">
                    <Tab label="Security" {...a11yProps(0)} className="tabs"/>
                    <Tab label="Notifications" {...a11yProps(1)} className="tabs"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} >
                    <div className="panelStyling">
                        <TextField 
                            type="password"
                            id="password"
                            label="Enter current password"
                            defaultValue={currentPass}
                            variant="outlined"
                            className="securityStyling"
                            onChange={handleCurrentPass}
                            fullWidth
                            required>
                        </TextField>
                        <TextField 
                            type="password"
                            id="password"
                            label="Enter new password"
                            defaultValue={newPass}
                            variant="outlined"
                            className="securityStyling"
                            onChange={handleNewPass}                            
                            fullWidth
                            required>
                        </TextField>
                        <TextField 
                            type="password"
                            id="password"
                            label="Confirm new password"
                            defaultValue={repeatPass}
                            variant="outlined"
                            className="securityStyling"
                            onChange={handleRepeatPass}
                            fullWidth
                            required>
                        </TextField>
                        <div className="saveButtonContainer"><Button variant="outlined" className="saveButton" onClick={updatePatientSettings}>Save</Button></div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="panelStyling">
                        <div className="phoneNumberContainer">
                            <Typography variant="h5" align="center" className="phoneHeading">Phone Number</Typography>
                            <div className="settingsForm">
                                <div className="formHalf">
                                    <FormControl component="fieldset" className="formControl">
                                        <FormLabel component="legend">Notify Me?</FormLabel>
                                        <RadioGroup row ria-label="phone notification" name="phone notification" className="formLabelShift" value={notifyPhone} onChange={handleNotifyPhone}>
                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="formHalf">
                                    <FormControl component="fieldset" className="formControl">
                                        <TextField 
                                            id="outlined-basic"
                                            label={user.phoneNumber}
                                            onChange={handleNewPhone}
                                            variant="outlined"
                                            className="formLabelShift"
                                            fullWidth>
                                        </TextField>
                                    </FormControl>                                
                                </div>
                            </div>
                        </div>
                        <div className="emailContainer">
                            <Typography variant="h5" align="center" className="emailHeading">Email</Typography>
                            <div className="settingsForm">
                                <div className="formHalf">
                                    <FormControl component="fieldset" className="formControl">
                                        <FormLabel component="legend">Notify Me?</FormLabel>
                                        <RadioGroup row ria-label="email notification" name="email notification" className="formLabelShift" value={notifyEmail} onChange={handleNotifyEmail}>
                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="formHalf">
                                    <FormControl component="fieldset" className="formControl">
                                        <TextField 
                                            id="outlined-basic"
                                            label={user.email}
                                            onChange={handleNewEmail}
                                            variant="outlined"
                                            className="formLabelShift">
                                        </TextField>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="saveButtonContainer"><Button variant="outlined" className="saveButton" onClick={updatePatientSettings}>Save</Button></div>
                    </div>
                </TabPanel>
            </div>
            </div>
            </Grid>
            <Grid item xs={1}></Grid>
      </Grid>
    )
}