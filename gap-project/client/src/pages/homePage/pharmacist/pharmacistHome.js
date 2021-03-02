import React, { useState, useEffect } from "react"
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import '../pharmacist/pharmacistHome.css'
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    /*root: {
        flexGrow: 1,
    },*/
    darkBluePaper: {
      background: "#00529B"
    }
}));


export default function PharmacistHome(props){

    let propsName = "Richard";
    let numPatients = "52";

    const classes = useStyles();

    return(
       <div className = "pharmacistHomeContainer">
            <div className = "greetingContainer">
              <div className = "nameBar"> Hi {propsName}, </div>
              <div className = "patientBar"> You have {numPatients} patients to check up on!</div>
            </div>

            <div className = "barContainer">
                <div className = "filterContainer">
                    <div className = "sortBox"> SORT </div>
                    <div className = "filterBox" id = "patientName"> Patient Name </div>

                </div>

                <div className = "searchBarContainer">
                <SearchIcon className = "searchIcon"/>
                </div>
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

                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem">01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem">Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Vestibulum</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Vestibulum</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem">01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem">Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Vestibulum</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Vestibulum</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem">01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem">Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Vestibulum</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Vestibulum</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem">01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem">Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem">Vestibulum</Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2" id = 'grayRow'>Vestibulum</Paper>
                </Grid>
            </Grid>
       </div>
    )
}
