import React, { useState, useEffect, useContext } from "react"
import {UserContext} from "../../../UserContext";
import {PatientContext} from "../../../PatientContext";
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import '../pharmacist/pharmacistHome.css'
import Paper from '@material-ui/core/Paper';
import SearchBar from "material-ui-search-bar";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    darkBluePaper: {
      background: "#00529B"
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
}));


export default function PharmacistHome(props){
    const {user, setUser} = useContext(UserContext);
    const {patient, setPatient} = useContext(PatientContext);
    const [patients, setPatients] = useState("");
    const [searchString, setSearchString] = useState("");
    const [filterSetting, setFilterSetting] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/patients/all").then(res => {
            setPatients(res.data);
        })
    },[])

    // Search patient names via string input
    const searchPatients = () => {
        let search=[];
        if (searchString === "" || searchString === null){
            search = patients;
            return search;
        }
        for (let i = 0; i<patients.length; i++){
            if (`${patients[i].firstName.toLowerCase()} ${patients[i].lastName.toLowerCase()}`.includes(searchString.toLowerCase())){
                search.push(patients[i])
            }
        }
        return search;
    }
    const dayMonthYear = (date) => {
        let dd = String(date.getDate());
        let mm = String(date.getMonth()+1);
        let yy = String(date.getFullYear());
        let dateString = `${mm}/${dd}/${yy}`;
        return dateString;
    }
    const handleNewFilter = (event) => {
        setFilterSetting(event.target.value);
    }

    // Sets the patient in focus to view there information for View profile button
    const handlePharmAssign = (event) => {
        let patientId = event.target.ariaLabel;
        for (let i = 0; i<patients.length; i++){
            if (patients[i]._id === patientId){
                setPatient(patients[i]);
            }
        }       
    }

    // Dynamic filtering through array of patients
    const handleFilterPatients = () => {
        let patientList = searchPatients();
        if (filterSetting === ""){
            return patientList;
        }
        else if (filterSetting === "firstName"){
            return patientList.sort((a,b) => a.firstName.localeCompare(b.firstName));
        }
        else if (filterSetting === "lastName"){
            return patientList.sort((a,b) => a.lastName.localeCompare(b.lastName));
        }
        else if (filterSetting === "birthday"){
            return patientList.sort((a,b) => new Date(a.birthday) - new Date(b.birthday));
        }
        else if (filterSetting === "lastCheckin"){
            return patientList.sort((a,b) => new Date(a.recentCheckIn) - new Date(b.recentCheckIn));
        }
        else if (filterSetting === "nextCheckin"){
            return patientList.sort((a,b) => new Date(a.nextCheckIn) - new Date(b.nextCheckIn));
        }
    }

    const infusionStringArr = (arr) => {
        let str = "";
        arr.map((item,index) => {
            if (index === arr-1){
                str += item;
            }
            str += item + ", ";
    })
    return str.slice(0, str.length-2);
    }

    const classes = useStyles();

    return(
        <div className = "pharmacistHomeContainer">
            <div className = "greetingContainer">
              <div className = "nameBar"> Hi {user.firstName}, </div>
              <div className = "patientBar"> You have {patients.length} patients to check up on!</div>
            </div>

            <div className = "barContainer">
                <div className = "filterContainer">
                    <div className = "sortBox"> <Typography variant="h6" className="sortText">SORT</Typography> </div>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Filter by...</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        value={filterSetting}
                        onChange={handleNewFilter}
                        fullWidth
                        >
                        <MenuItem value="firstName">First Name</MenuItem>
                        <MenuItem value="lastName">Last Name</MenuItem>
                        <MenuItem value="birthday">Birthday</MenuItem>
                        <MenuItem value="lastCheckin">Last Check-In</MenuItem>
                        <MenuItem value="nextCheckin">Next Check-In</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <InputLabel><Typography variant="subtitle2">Patient Name: {patient === null ? "" : `${patient.firstName} ${patient.lastName}`}</Typography></InputLabel>
                    <Button disabled={patient === null} variant="contained" size="small" className="buttonLinkStyling"><Link to="/pharmAssign" className="linkStyling">View Profile</Link></Button>
                </div>
                
                <SearchBar
                    value={searchString}
                    onChange={(newValue) => setSearchString(newValue)}
                />
            </div>
            <Grid container spacing={0} id = "gridContainer">
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItemTitle" id = 'patientCol'>Patient Name</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItemTitle" id = 'dobCol'>Date of Birth</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItemTitle" id = 'genderCol'>Gender</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItemTitle" id = 'lastCheckCol'>Last Check-In</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItemTitle" id = 'nextCheckCol'>Next Check-In</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItemTitle" id = 'infusionCol'>Infusion Type</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItemTitle" id = 'notificationCol'>Notification Info</Paper>
                </Grid>

                {patients.length !== 0 ? handleFilterPatients().map((patient, index) => {
                    return <Grid container>
                        <Grid item xs={2}>
                            <Paper className={classes.paper} className = "gridItem" onClick={handlePharmAssign} aria-label={patient._id}>{`${patient.firstName} ${patient.lastName}`}</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper className={classes.paper} className = "gridItem">{`${dayMonthYear(new Date(patient.birthday))}`}</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper className={classes.paper} className = "gridItem">{`${patient.gender[0].toUpperCase() + patient.gender.substring(1)}`}</Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper} className = "gridItem">{`${patient.hasOwnProperty('recentCheckIn') === false ? 'None Set' : new Date(patient.recentCheckIn).toLocaleDateString()}`}</Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper} className = "gridItem">{`${patient.hasOwnProperty('nextCheckIn') === false ? 'None Set' : new Date(patient.nextCheckIn).toLocaleDateString()}`}</Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper} className = "gridItem">{patient.infusionType.length === 0 ? "None Set" : infusionStringArr(patient.infusionType)}</Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper} className = "gridItem">{patient.notificationType === "both" ? "Phone and Email" : `${patient.notificationType[0].toUpperCase() + patient.notificationType.substring(1)}`}</Paper>
                        </Grid>
                    </Grid> 
                    }) : "Loading"}
            </Grid>
       </div>
    )
}