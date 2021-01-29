import React, { useState, useEffect } from "react"
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import '../patient/patientHome.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


export default function PatientHome(props){

    let propsName = "Jasmine";
    let nextInfusion = "Thursday, November 19th, 2020 at 6:00PM";
    let nextInfusionName = "Antibiotic";

    const classes = useStyles();

    return(
       <div className={classes.root}>
            <ThemeProvider theme={theme}>
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
       </div>
    )
}