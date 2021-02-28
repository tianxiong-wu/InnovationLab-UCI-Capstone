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
    const classes = useStyles();

    const {user, setUser} = useContext(UserContext);
    const [nextInfusion, setNextInfusion] = useState("");
    const [todaysSchedule, setTodaysSchedule] = useState([]);

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+ minutes: minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime
    }

    const getNextInfusion = () => {
        let infusionDate = new Date(user.events[0].notifyAt);
        let dayMonthYear = infusionDate.toLocaleDateString("en-US", options);
        let dateTime = formatTime(infusionDate);
        return `${dayMonthYear} at ${dateTime}.`
    }

    const dayMonthYear = (date) => {
        let dd = String(date.getDate());
        let mm = String(date.getMonth());
        let yy = String(date.getFullYear());
        let dateString = `${mm}/${dd}/${yy}`;
        return dateString;
    }

    const getTodaysSchedule = () => {
        let today = new Date();
        let scheduleArr = [];
        for (let i = 0; i < user.events.length; i++){
            if (dayMonthYear(today) ===  dayMonthYear(new Date(user.events[i].notifyAt))){
                scheduleArr.push(user.events[i]);
            }
        }
        return scheduleArr;
    }

    useEffect(() => {
        setNextInfusion(getNextInfusion);
        setTodaysSchedule(getTodaysSchedule);
    }, [])

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
                                {todaysSchedule.length === 0 ? <Typography variant="h4" align="center" className="noInfusions">No Infusions Today</Typography> 
                                : todaysSchedule.map((item => {
                                    console.log(item);
                                    return <ScheduleEvent time={formatTime(new Date(item.notifyAt))} name={item.title}/>
                                }))}
                            </div>
                        </Grid>
                </Grid>
            </ThemeProvider>
       </div>
    )
}