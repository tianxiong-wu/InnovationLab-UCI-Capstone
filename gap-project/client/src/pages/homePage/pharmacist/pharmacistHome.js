import React, { useState, useEffect, useContext } from "react"
import {UserContext} from "../../../UserContext";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import '../pharmacist/pharmacistHome.css'
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    /*root: {
        flexGrow: 1,
    },*/
    darkBluePaper: {
      background: "#00529B"
    }
}));


export default function PharmacistHome(props){
    const {user, setUser} = useContext(UserContext);
    const [patients, setPatients] = useState("");
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/patients/all").then(res => {
            setPatients(res.data);
        })
    },[])

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
        console.log(search);
        return search;
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
                    <div className = "sortBox"> SORT </div>
                    <div className = "filterBox" id = "patientName"> Patient Name </div>

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

                {patients.length !== 0 ? searchPatients().map(patient => {
                    return <Grid container>
                        <Grid item xs={2}>
                            <Paper className={classes.paper} className = "gridItem">{`${patient.firstName} ${patient.lastName}`}</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper className={classes.paper} className = "gridItem">{`${new Date(patient.birthday).toLocaleDateString()}`}</Paper>
                        </Grid>
                        <Grid item xs={1}>
                            <Paper className={classes.paper} className = "gridItem">{`${patient.gender[0].toUpperCase() + patient.gender.substring(1)}`}</Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper} className = "gridItem">{`${new Date(patient.recentCheckIn).toLocaleDateString()}`}</Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper} className = "gridItem">{`${new Date(patient.nextCheckIn).toLocaleDateString()}`}</Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper} className = "gridItem">Phasellus</Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper} className = "gridItem">Vestibulum</Paper>
                        </Grid>
                    </Grid> 
                    }) : "Loading"}
            </Grid>
       </div>
    )
}
