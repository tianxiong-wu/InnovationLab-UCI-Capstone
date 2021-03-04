import React, { useState, useEffect, useContext } from "react";
import {UserContext} from "../../UserContext";
import {PatientContext} from "../../PatientContext";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import ScheduleEvent from "../../components/scheduleEvent/scheduleEvent";
import { makeStyles, useTheme, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import axios from 'axios';
import './pharmAssign.css'

const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, },
    box: {
        display: 'flex',
        backgroundColor: '#3F51B5',
        width: "90%",
        height: "200px",
        margin: '0 auto',
        marginTop: '33px',
        borderRadius: 20,
        color: 'white',
        backgroundColor: '#00529b',
        textAlign: 'left',
        fontSize: '14px',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
    },
    content: {
        flex: '1 0 auto',
        marginTop: 5,
        marginLeft: 3,
    },
    cover: {
        width: 100,
        height: 100,
        margin: 'auto 31px',
        marginRight: 0,
    },
    summary: {
        //marginBottom: 30,
        overflowY: 'hidden',
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const TutorialsList = ()=>{
    const {patient, setPatient} = useContext(PatientContext);
    const classes = useStyles();
   return <>{patient !== null ? patient.infusionArray.map((item) => {
        return <Card className={classes.box}>
            <CardMedia
                className={classes.cover}
                image={item.tutorials[0].video.thumbnail}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {item.name}
                    </Typography>
                    <Typography className={classes.summary} variant="subtitle1" >
                        {item.description}
                    </Typography>
                    <Typography variant="subtitle1" >
                        Duration: {item.duration}
                    </Typography>
                </CardContent>
            </div>
            <ArrowForwardIosIcon className="arrowIcon" style={{border:'none'}}></ArrowForwardIosIcon>
        </Card>
    }):"Loading..."}</>
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function PharmAssign() {
    const classes = useStyles();
    const {user, setUser} = useContext(UserContext); // pharmacist account context
    const {patient, setPatient} = useContext(PatientContext); // current patient in focus, context
    const [todaysSchedule, setTodaysSchedule] = useState([]); // today's schedule for the patient
    const [openEventForm, setOpenEventForm] = useState(false);
    const [openTutorialForm, setOpenTutorialForm] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventNotifyAt, setEventNotifyAt] = useState(new Date);
    const [eventDescription, setEventDescription] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [patientEvents, setPatientEvents] = useState([]);

    const theme = useTheme();

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
        for (let i = 0; i < patient.events.length; i++){
            if (dayMonthYear(today) ===  dayMonthYear(new Date(patient.events[i].notifyAt))){
                scheduleArr.push(patient.events[i]);
            }
        }
        return scheduleArr;
    }

    /*
    * Event handlers for event object state
    */
    const handleTitleChange = (event) => {
        setEventTitle(event.target.value);
    }
    const handleNotifyAtChange = (event) => {
        setEventNotifyAt(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setEventDescription(event.target.value);
    }
    const handleSelectedDate = (date) => {
        setSelectedDate(date);
    }
    const handleSelectedTime = (date) => {
        setSelectedTime(date);
    }


    const handleEventForm = () => {
        setOpenEventForm(!openEventForm);
    }

    const handleTutorialForm = () => {
        setOpenTutorialForm(!openTutorialForm);
    }

    const handleAddPatientEvent = () => {
        const event = {
            title: eventTitle,
            start: eventNotifyAt,
            end: eventNotifyAt,
            notifyAt: eventNotifyAt,
            description: eventDescription
        }
        let patientEventsArr = patientEvents;
        patientEventsArr.push(event);
        axios.post(`http://localhost:5000/patients/updateEvents/${patient._id}`, patientEventsArr).then(res => {
            console.log(res);
        })
        console.log(patientEventsArr);
        handleEventForm();
    }

    const handleAddPatientTutorial = () => {
        // axios put a tutorial object
    }
    
    
    useEffect(() => {
        setTodaysSchedule(getTodaysSchedule);
        setPatientEvents(patient.events);
        console.log(patientEvents);
    },[])

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Grid container justify="center" spacing={0}>
                    <Grid item xs={8} sm={8} md={5} className="">
                        <div>
                            <div style={{ textAlign: "left", height: '30vh' }}>
                                <br />
                                <Typography variant="h2">{patient !== null ? `${patient.firstName} ${patient.lastName}` : "No User Selected"}</Typography>
                                <br />
                                <br />
                                <br />
                                <Typography variant="h6">Phone: {patient !== null ? `(${patient.phoneNumber.slice(0,3)}) ${patient.phoneNumber.slice(3,6)}-${patient.phoneNumber.slice(6)}` : "Loading..."}</Typography>
                                <Typography variant="h6">Email: {patient !== null ? patient.email : "Loading..."}</Typography>

                            </div>
                            <div className="">
                                <div className="notificationLabel">
                                    <Typography variant="h4">
                                        Today's Schedule <Button variant="outlined" className="addMinusBtns" onClick={handleEventForm}><AddIcon/></Button>
                                        <Button variant="outlined" className="addMinusBtns"><RemoveIcon/></Button>
                                    </Typography>                                
                                </div>
                                <div className="notificationContainer">
                                {todaysSchedule.length === 0 ? <Typography variant="h4" align="center" className="noInfusions">No Infusions Today</Typography> 
                                : todaysSchedule.map((item => {
                                    return <ScheduleEvent time={formatTime(new Date(item.notifyAt))} name={item.title}/>
                                }))}
                                </div>
                                <Dialog
                                    open={openEventForm}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleEventForm}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle>Add Notification Event Form</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        <TextField label="Title" variant="outlined" onChange = {handleTitleChange} fullWidth required />
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Date picker dialog"
                                                format="MM/dd/yyyy"
                                                value={selectedDate}
                                                fullWidth
                                                onChange={handleSelectedDate}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}/>
                                            <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Time picker"
                                            value={selectedTime}
                                            fullWidth
                                            onChange={handleSelectedTime}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}/>
                                        </MuiPickersUtilsProvider>
                                        <TextField label="Description" variant="outlined" onChange = {handleDescriptionChange} fullWidth required />
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleEventForm} color="primary">
                                        Close
                                    </Button>
                                    <Button onClick={handleAddPatientEvent} variant="contained" color="primary">
                                        Submit
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={8} sm={8} md={5} style={{marginLeft:'50px'}} className="widgetContainer">
                        <div className="scheduleLabel">
                            <Typography variant="h4">
                                Assigned Tutorials<Button variant="outlined" className="addMinusBtns" onClick={handleTutorialForm}><AddIcon/></Button>
                                <Button variant="outlined" className="addMinusBtns"><RemoveIcon/></Button>
                            </Typography>  
                        </div>
                        <div className="scheduleWidget">
                            {<TutorialsList classes={classes}></TutorialsList>}
                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}
