import React, {useState} from "react";
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
    },
  }));

export default function PatientSettings(){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [notifyPhone, setNotifyPhone] = useState(false);
    const [notifyEmail, setNotifyEmail] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      
    function updatePatientSettings() {
        alert('you saved your phone number')
    }
    
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
                            id="outlined-basic"
                            label="Enter current password"
                            defaultValue=""
                            variant="outlined"
                            className="securityStyling"
                            fullWidth
                            required>
                        </TextField>
                        <TextField 
                            id="outlined-basic"
                            label="Enter new password"
                            defaultValue=""
                            variant="outlined"
                            className="securityStyling"                            
                            fullWidth
                            required>
                        </TextField>
                        <TextField 
                            id="outlined-basic"
                            label="Confirm new password"
                            defaultValue=""
                            variant="outlined"
                            className="securityStyling"
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
                                        <FormLabel component="legend" className="formLabel">Notify Me?</FormLabel>
                                        <RadioGroup row ria-label="gender" name="gender1" className="formLabelShift" value={value} onChange={handleChange}>
                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="formHalf">
                                    <FormControl component="fieldset" className="formControl">
                                        <FormLabel component="legend" className="formLabel"></FormLabel>
                                        <TextField 
                                            id="outlined-basic"
                                            label="714-123-4567"
                                            defaultValue=""
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
                                        <FormLabel component="legend" className="formLabel">Notify Me?</FormLabel>
                                        <RadioGroup row ria-label="gender" name="gender1" className="formLabelShift" value={value} onChange={handleChange}>
                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="formHalf">
                                    <FormControl component="fieldset" className="formControl">
                                        <FormLabel component="legend" className="formLabel"></FormLabel>
                                        <TextField 
                                            id="outlined-basic"
                                            label="JMiller@gmail.com"
                                            defaultValue=""
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