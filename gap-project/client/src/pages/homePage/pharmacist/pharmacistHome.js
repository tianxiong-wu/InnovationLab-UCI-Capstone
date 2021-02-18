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
      backgroundColor: "#00529B"
    }
}));
/*
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
*/

/*<ThemeProvider theme={theme}>
    <Grid container justify="center" spacing={3}>
        <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Typography variant="h4" className="nextInfusionSummary">Hi {propsName}, your next infusion is on {nextInfusion}</Typography>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} sm={8} md={4} className="widgetContainer">
                <div>
                    <div className="infusionWidget">
                        <div className="infusionVideoContainer">
                            <img src="https://picsum.photos/600/400" className="infusionThumbnail"></img>
                        </div>
                        <div className="infusionLabel">
                            <Typography variant="h4">Next Infusion: {nextInfusionName}</Typography>
                        </div>
                    </div>
                    <div className="notifWidget">
                        <div className="notificationLabel">
                            <Typography variant="h4">Notifications</Typography>
                        </div>
                        <div className="notificationContainer">
                            <Typography variant="h4">notification component</Typography>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={8} sm={8} md={4} className="widgetContainer">
                <div className="scheduleLabel">
                    <Typography variant="h4">Today's Schedule</Typography>
                </div>
                <div className="scheduleWidget">
                    <Typography variant="h4">Infusion Event</Typography>
                    <Typography variant="h4">Infusion Event</Typography>
                    <Typography variant="h4">Infusion Event</Typography>
                </div>
            </Grid>
    </Grid>
</ThemeProvider>
*/


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


            <Grid container spacing={0} className = "gridContainer">
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItemTitle">Patient Name</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItemTitle">Date of Birth</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItemTitle">Gender</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItemTitle">Last Check-In</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItemTitle">Next Check-In</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItemTitle">Infusion Type</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItemTitle">Notification Info</Paper>
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
                    <Paper className={classes.paper} className = "gridItem2">Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2">01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2">Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">Vestibulum</Paper>
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
                    <Paper className={classes.paper} className = "gridItem2">Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2">01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2">Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">Vestibulum</Paper>
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
                    <Paper className={classes.paper} className = "gridItem2">Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2">01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2">Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">Vestibulum</Paper>
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
                    <Paper className={classes.paper} className = "gridItem2">Lorem</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2">01/01/2001</Paper>
                </Grid>
                <Grid item xs={1}>
                    <Paper className={classes.paper} className = "gridItem2">Dolor</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">02/02/2002</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">03/03/2003</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">Phasellus</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} className = "gridItem2">Vestibulum</Paper>
                </Grid>
            </Grid>
       </div>
    )
}
