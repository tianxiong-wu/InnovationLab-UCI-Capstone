import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../UserContext";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ScheduleEvent from "../../../components/scheduleEvent/scheduleEvent";
import Notifications from "../../../components/notifications/notifications";
import '../patient/patientHome.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh'
    },
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


export default function PatientHome(props){
    const {user, setUser} = useContext(UserContext);

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
                            <Typography variant="h4" className="nextInfusionSummary">Hi {user.firstName}, your next infusion is on {nextInfusion}</Typography>
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} sm={8} md={4} className="widgetContainer">
                            <div>
                                <div className="infusionWidget">
                                    <div className="infusionVideoContainer">
                                        <img src="https://picsum.photos/600/400" className="infusionThumbnail"></img>
                                    </div>
                                    <div className="infusionLabel">
                                        <Typography variant="h5">Next Infusion: {user.events[0].title}</Typography>
                                    </div>
                                </div>
                                <div className="notifWidget">
                                    <div className="notificationLabel">
                                        <Typography variant="h4">Notifications</Typography>
                                    </div>
                                    <div className="notificationContainer">
                                        <br/>
                                        {user.notification.map((item => {
                                            return <Notifications title={item.title} description={item.description}/>
                                        }))}
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={8} sm={8} md={4} className="widgetContainer">
                            <div className="scheduleLabel">
                                <Typography variant="h4">Today's Schedule</Typography>
                            </div>
                            <div className="scheduleWidget">
                                <br/>
                                <ScheduleEvent time="12:30PM" name="Antibiotic Infusion"/>
                                <ScheduleEvent time="4:30PM" name="Antibiotic Infusion"/>
                                <ScheduleEvent time="8:30PM" name="Antibiotic Infusion"/>
                            </div>
                        </Grid>
                </Grid>
            </ThemeProvider>
       </div>
    )
}