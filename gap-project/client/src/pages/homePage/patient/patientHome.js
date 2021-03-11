import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../UserContext";
import { TutorialContext } from "../../../TutorialContext";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ScheduleEvent from "../../../components/scheduleEvent/scheduleEvent";
import Notifications from "../../../components/notifications/notifications";
import { useHistory } from 'react-router-dom';
import '../patient/patientHome.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "@material-ui/core/Button";
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh'
    },
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function PatientHome(props){
    const classes = useStyles();
    const history = useHistory();
    const {user, setUser} = useContext(UserContext);
    // Tutorial context allows us to determine which tutorial to redirect to via its id. 
    const {tutorial, setTutorial} = useContext(TutorialContext);

    const [nextInfusion, setNextInfusion] = useState(""); // Next infusion based on the earliest item in an array for all events after the current time 
    const [todaysSchedule, setTodaysSchedule] = useState([]); // Schedule events of the day
    const [tutorialSelect, setTutorialSelect] = useState(null); // Selected tutorial to view
    const [openTutorialPrompt, setTutorialPrompt] = useState(false);

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

    // Called on useEffect to find the next infusion
    const getNextInfusion = () => {
        let today = new Date().getTime();
        let eventArr = [];

        for (let i = 0; i < user.events.length; i++){
            if (today < new Date(user.events[i].notifyAt).getTime()){
                eventArr.push(user.events[i])
            }
        }
        eventArr.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        })
        if (eventArr.length > 0){
            let dayMonthYear = new Date(eventArr[0].notifyAt).toLocaleDateString("en-US", options);
            let dateTime = formatTime(new Date(eventArr[0].notifyAt));
            return [`${dayMonthYear} at ${dateTime}.`, eventArr[0].tutorialId]
        } 
        else {
            return ['not set yet.', null]
        }

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

    const handleTutorialPrompt = (event) => {
        user.infusionArray.map(tutorial => {
            if (tutorial._id === nextInfusion[1]){
                setTutorialSelect(tutorial.name);
                setTutorial(tutorial);
            }
        })
        setTutorialPrompt(!openTutorialPrompt);
    }
    const findThumbnail = () => {
        for (let i = 0; i < user.infusionArray.length; i++){
            if (user.infusionArray[i]._id === nextInfusion[1]){
                return `${user.infusionArray[i].tutorials[0].video.thumbnail}`
            }
        }
    }

    const handleChange = (id)=>{
        history.push('/tutorial/' + id);
      }
    

    useEffect(() => {
        if (user.events.length > 0){
            setNextInfusion(getNextInfusion);
        }
        setTodaysSchedule(getTodaysSchedule);
    }, [])

    return(
       <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Grid container justify="center" >
                    <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5" className="nextInfusionSummary">{user.events.length === 0 ? `Hi ${user.firstName}, you have no upcoming infusions.` : `Hi ${user.firstName}, your next infusion is ${nextInfusion[0]}`}</Typography>
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} sm={8} md={4} className="widgetContainer">
                            <div>
                                <div className="infusionWidget" onClick={()=>handleChange(0)}>
                                    <div className="infusionVideoContainer">
                                        {nextInfusion[1] === null || user.infusionArray.length === 0 ? <img src="https://picsum.photos/seed/picsum/200/300" className="infusionThumbnail"></img>
                                        : <img src={findThumbnail()} onClick={handleTutorialPrompt}/>}
                                    </div>
                                    <div className="infusionLabel">
                                        <Typography variant="h5">{nextInfusion[1] === null || user.infusionArray.length === 0 ? "No Upcoming Events." : <span onClick={handleTutorialPrompt}>Next Infusion: {user.infusionArray[0].name}</span>}</Typography>
                                    </div>
                                </div>
                                <div className="notifWidget">
                                    <div className="notificationLabel">
                                        <Typography variant="h4">Notifications</Typography>
                                    </div>
                                    <div className="notificationContainer">
                                        <br/>
                                        {user.notification.length === 0 ? "No notifications" : user.notification.map((item => {
                                            return <Notifications title={item.title} description={item.description}/>
                                        }))}
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={8} sm={8} md={4} className="widgetContainer">
                            <div className="scheduleLabel">
                                <Typography variant="h4" align="center">Today's Schedule</Typography>
                            </div>
                            <div className="scheduleWidget">
                                <br/>
                                {todaysSchedule.length === 0 ? <Typography variant="h4" align="center" className="noInfusions">No Infusions Today</Typography> 
                                : todaysSchedule.map((item => {
                                    return <ScheduleEvent time={formatTime(new Date(item.notifyAt))} name={item.title}/>
                                }))}
                            </div>
                        </Grid>
                </Grid>
                <Dialog
                    open={openTutorialPrompt}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleTutorialPrompt}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>Tutorial Select</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        <Typography>Go to {tutorialSelect} Tutorial? </Typography>
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleTutorialPrompt} color="primary">
                        Close
                    </Button>
                    <Link to="/tutorialPage"><Button disabled={tutorial === null} variant="contained" color="primary">
                        View
                    </Button></Link> 
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
       </div>
    )
}